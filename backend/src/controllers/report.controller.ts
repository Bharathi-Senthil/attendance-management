import { Request, Response } from "express";
import { sequelize } from "../db";
import { Sequelize } from "sequelize";
import fs from "fs";

var nodemailer = require("nodemailer");
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
            date ? `, da.reason` : ""
          }
          FROM students s 
          LEFT JOIN day_attendances da ON s.id = da.student_id 
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
        this.sendMail();

        res.status(200).json(data[0]);
      });
  }

  getDashboardReportByDate(req: Request, res: Response) {
    const { year, sec, date, mentorId }: any = req.query;

    let where = ``;
    if (year) where += ` s.year_id = ${year}`;
    if (sec)
      where += ` ${where.length === 0 ? "" : " AND"} s.section_id = ${sec}`;
    if (mentorId)
      where += ` ${where.length === 0 ? "" : " AND"} s.mentor_id = ${mentorId}`;

    sequelize
      .query(
        `
        SELECT COUNT(CASE WHEN da.date IS NULL THEN 1 END) as totalPresent,
        COUNT(CASE WHEN da.date IS NOT NULL THEN 1 END) as totalAbsent,
        COUNT(s.id) as totalStudents
        FROM students s
        LEFT JOIN day_attendances da ON s.id = da.student_id AND da.date = '${date} 00:00:00.000 +00:00'
        WHERE${where}
        `
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  }

  getDashboardReportByDateRange(req: Request, res: Response) {
    const { year, sec, mentorId, startDate, endDate }: any = req.query;

    let where = ``;
    if (year) where += ` year_id = ${year}`;
    if (sec)
      where += ` ${where.length === 0 ? "" : " AND"} section_id = ${sec}`;
    if (mentorId)
      where += ` ${where.length === 0 ? "" : " AND"} mentor_id = ${mentorId}`;

    sequelize
      .query(
        `
        SELECT Date(date) AS date, COUNT(*) AS totalAbsent,
        (SELECT COUNT(*) FROM students WHERE${where}) AS totalStudent
        FROM day_attendances
        WHERE date BETWEEN "${startDate}" AND "${endDate}"
        AND student_id IN (SELECT id FROM students WHERE${where})
        AND is_absent = 1
        GROUP BY date
        `
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  }

  sendMail() {
    const pathToFile = __dirname + "/test.csv";

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "panimalar.backup@gmail.com",
        pass: "tlktpezddakdlkfv",
      },
    });

    let mailDetails = {
      from: "panimalar.backup@gmail.com",
      to: "sbharathi261@gmail.com",
      subject: "Test mail",
      attachments: [
        {
          filename: "test.csv",

          path: pathToFile,
        },
      ],
    };

    mailTransporter.sendMail(mailDetails, function (err: any, data: any) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
        fs.unlink(pathToFile, function (err) {
          if (err) {
            throw err;
          } else {
            console.log("Successfully deleted the file.");
          }
        });
      }
    });
  }
}
