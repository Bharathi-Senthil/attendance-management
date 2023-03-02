import { Request, Response } from "express";
import { DayAttendance, Student } from "./../models";
import { sequelize } from "../db";
import { Sequelize } from "sequelize";

export class ReportController {
  constructor() {}

  private options = (year: number, sec: number) => {
    return {
      attributes: [
        [Sequelize.col("student.name"), "name"],
        [Sequelize.col("student.roll_no"), "rollNo"],
        [Sequelize.col("student.reg_no"), "regNo"],
        [Sequelize.col("student.parent_mobile"), "parentMobile"],
        [sequelize.fn("COUNT", "id"), "totalAbsent"],
      ],
      include: [
        {
          model: Student,
          as: "student",
          attributes: [],
          where: {
            year_id: year,
            section_id: sec,
          },
        },
      ],
      group: ["student.id"],
    };
  };

  getDayReport(req: Request, res: Response) {
    const { year, sec }: any = req.query;
    let where: any = { isAbsent: true };
    let fOptions: any = { ...this.options(year, sec), where };
    DayAttendance.findAll(fOptions).then((data) => {
      res.status(200).json(data);
    });
  }
}
