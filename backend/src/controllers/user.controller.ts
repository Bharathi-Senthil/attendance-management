import { Request, Response } from "express";
import { StudentService, UserService } from "../services";
import { Student, User } from "../models";
import { getPagingData } from "../helpers";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
  private userService: UserService;
  private studentService: StudentService;

  constructor() {
    this.userService = new UserService(User);
    this.studentService = new StudentService(Student);
  }

  private options = { where: { role: "MENTOR" } };

  getPaged(req: Request, res: Response) {
    const { page, size } = req.query;
    this.userService.getPaged(page, size, this.options).then((user) => {
      res.status(200).json(getPagingData(user));
    });
  }

  getAll(req: Request, res: Response) {
    this.userService.getAll(this.options).then((users) => {
      res.status(200).json(users);
    });
  }

  getById(req: Request, res: Response) {
    this.userService.get(req.params.id, this.options).then((user) => {
      if (user) res.status(200).json(user);
      else
        res.status(404).json({
          message: `User id:${req.params.id} does not exists`,
        });
    });
  }

  async post(req: Request, res: Response) {
    const { name, email, password, studentId } = req.body;

    this.userService
      .find({ where: { email } })
      .then((user) => {
        if (user)
          return res.status(409).send("User Already Exist. Please Login");
      })
      .catch((err) => res.status(400).json(err));

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: "MENTOR",
    });

    this.userService
      .create(user)
      .then((user) => {
        delete user.dataValues.password;
        if (studentId.length > 0)
          studentId.forEach((s: number) => {
            this.studentService.update(s, { mentorId: user.dataValues.id });
          });
        res.status(201).json(user);
      })
      .catch((err) => res.status(400).json(err));
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    this.userService
      .find({ where: { email } })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.dataValues.password).then((checked) => {
            if (checked) {
              const token = jwt.sign(
                {
                  userId: user.dataValues.id,
                  email,
                  role: user.dataValues.role,
                },
                process.env.TOKEN_KEY ? process.env.TOKEN_KEY : "",
                {
                  expiresIn: "2h",
                }
              );

              user.dataValues.token = token;
              delete user.dataValues.password;

              res.status(200).json(user);
            } else {
              res.status(401).send("Invalid Credentials");
            }
          });
        } else res.status(401).send("Invalid Credentials");
      })
      .catch((err) => res.status(400).json(err));
  }

  update(req: Request, res: Response) {
    let data = req.body;

    this.userService.get(req.params.id).then((user) => {
      if (user) {
        let updatedDayAttendance = new User({
          ...user.dataValues,
          ...data,
        });

        this.userService
          .update(req.params.id, updatedDayAttendance)
          .then(() => res.status(200).json(updatedDayAttendance))
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `User id:${req.params.id} does not exists`,
        });
    });
  }

  delete(req: Request, res: Response) {
    this.userService.get(req.params.id).then((user) => {
      if (user) {
        this.userService
          .delete(req.params.id)
          .then((user) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `User id:${req.params.id} does not exists`,
        });
    });
  }
}
