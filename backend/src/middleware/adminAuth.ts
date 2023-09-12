import { NextFunction, Response } from "express";
import { verify, decode } from "jsonwebtoken";

const config = process.env.TOKEN_KEY ? process.env.TOKEN_KEY : "";

export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization?.split(" ")[1];

  let user: any = decode(token, { complete: true })?.payload;
  let isAdmin = user.role === "ADMIN";

  if (!token || !isAdmin) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = verify(token, config);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
