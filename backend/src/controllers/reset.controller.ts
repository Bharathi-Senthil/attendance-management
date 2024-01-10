import { sequelize } from "./../db";
import { Request, Response } from "express";
import { DayAttendance, Student } from "../models";
import { Op } from "sequelize";

export class ResetController {
  constructor() { }

  async promotion(req: Request, res: Response) {
    try {
      await Student.destroy({ where: { year_id: 4 } });

      await sequelize.query("UPDATE students SET year_id = year_id + 1");
      res.status(200).json({ message: "Promotion Successful" });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  reset(req: Request, res: Response) {
    const { date, year } = req.query;

    sequelize.query(`
    DELETE FROM day_attendances WHERE id in
    (  
      SELECT da.id FROM day_attendances da
      LEFT JOIN students s on da.student_id = s.id
      WHERE da.date <= '${date} 00:00:00.000 +00:00' AND s.year_id = ${year}
    )
    `)
      .then((_) => res.status(200).json())
      .catch((err) => res.status(400).json(err));
  }
}
