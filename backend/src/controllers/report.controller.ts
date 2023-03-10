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
    const { year, sec, date }: any = req.query;
    let where = `WHERE da.is_absent = TRUE AND s.year_id = ${year}`;
    if (sec != "null") where += ` AND s.section_id = ${sec}`;
    sequelize
      .query(
        `
          SELECT  s.name, s.roll_no, s.reg_no, s.parent_mobile, COUNT(da.id) AS totalAbsent ${
            date ? `, r.reason` : ""
          }
          FROM students s 
          LEFT JOIN day_attendances da ON s.id = da.student_id 
          ${
            date
              ? `LEFT JOIN reasons r ON r.date = "${date} 00:00:00.000 +00:00"`
              : ""
          }
          ${where} 
          GROUP BY s.id, s.name 
          HAVING SUM(${
            date
              ? `CASE WHEN da.date = "${date} 00:00:00.000 +00:00" THEN 1 ELSE 0 END`
              : "da.id"
          }) > 0;
        `
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  }
}
