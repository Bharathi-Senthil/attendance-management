import { sequelize } from "./../db";
import { Request, Response } from "express";
import { Student } from "../models";

export class ResetController {
  constructor() {}

  async promotion(req: Request, res: Response) {
    try {
      await Student.destroy({ where: { year_id: 4 } });

      await sequelize.query("UPDATE students SET year_id = year_id + 1");
      res.status(200).json({ message: "Promotion Successful" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
