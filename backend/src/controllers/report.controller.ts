import { Request, Response } from "express";
import { DayAttendance, Student } from "./../models";
import { sequelize } from "../db";
import { Sequelize } from "sequelize";

export class ReportController {
  constructor() {}

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

  getDashboardReportByDate(req: Request, res: Response) {
    const { year, sec, date }: any = req.query;
    sequelize
      .query(
        `
        SELECT COUNT(CASE WHEN da.date IS NULL THEN 1 END) as totalPresent,
        COUNT(CASE WHEN da.date IS NOT NULL THEN 1 END) as totalAbsent,
        COUNT(s.id) as totalStudents
        FROM students s
        LEFT JOIN day_attendances da ON s.id = da.student_id AND da.date = '${date} 00:00:00.000 +00:00'
        WHERE s.year_id = ${year} AND s.section_id = ${sec}
        `
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  }

  getDashboardReportByDateRange(req: Request, res: Response) {
    const { year, sec, startDate, endDate }: any = req.query;
    sequelize
      .query(
        `
        SELECT Date(date) AS date, COUNT(*) AS totalAbsent,
        (SELECT COUNT(*) FROM students WHERE year_id = ${year} AND section_id = ${sec}) AS totalStudent
        FROM day_attendances
        WHERE date BETWEEN "${startDate}" AND "${endDate}"
        AND student_id IN (SELECT id FROM students WHERE year_id = ${year} AND section_id = ${sec})
        AND is_absent = 1
        GROUP BY date
        `
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  }
}
