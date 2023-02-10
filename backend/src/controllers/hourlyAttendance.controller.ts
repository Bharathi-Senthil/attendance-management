import { Request, Response } from "express";
import { HourlyAttendanceService } from "../services";
import { HourlyAttendance, Student, Subject } from "../models";

export class HourlyAttendanceController {
  private hourlyAttendanceService: HourlyAttendanceService;

  private getOptions = {
    include: [
      { model: Student, as: "student" },
      { model: Subject, as: "subject" },
    ],
  };

  private formatHourlyAttendance(hourlyAttendance: any) {
    delete hourlyAttendance.dataValues.subjectId;
    delete hourlyAttendance.dataValues.studentId;
    return hourlyAttendance;
  }

  private assignHourlyAttendance(hourlyAttendance: any) {
    hourlyAttendance.subjectId = hourlyAttendance.subject;
    hourlyAttendance.studentId = hourlyAttendance.student;
    delete hourlyAttendance.subject;
    delete hourlyAttendance.student;
    return hourlyAttendance;
  }

  constructor() {
    this.hourlyAttendanceService = new HourlyAttendanceService(
      HourlyAttendance
    );
  }

  getAll(req: Request, res: Response) {
    this.hourlyAttendanceService
      .getAll(this.getOptions)
      .then((hourlyAttendances) => {
        hourlyAttendances?.forEach((a) => {
          this.formatHourlyAttendance(a);
        });
        res.status(200).json(hourlyAttendances);
      });
  }

  getById(req: Request, res: Response) {
    this.hourlyAttendanceService
      .get(req.params.id, this.getOptions)
      .then((hourlyAttendance) => {
        if (hourlyAttendance)
          res.status(200).json(this.formatHourlyAttendance(hourlyAttendance));
        else
          res.status(404).json({
            message: `Hourly Attendance id:${req.params.id} does not exists`,
          });
      });
  }

  post(req: Request, res: Response) {
    let data = this.assignHourlyAttendance(req.body);

    console.log(data);

    let hourlyAttendance = new HourlyAttendance(data);
    this.hourlyAttendanceService
      .create(hourlyAttendance)
      .then((hourlyAttendance) => res.status(201).json(hourlyAttendance))
      .catch((err) => res.status(400).json(err.errors));
  }

  update(req: Request, res: Response) {
    let data = this.assignHourlyAttendance(req.body);

    this.hourlyAttendanceService.get(req.params.id).then((hourlyAttendance) => {
      if (hourlyAttendance) {
        let updatedHourlyAttendance = new HourlyAttendance({
          ...hourlyAttendance.dataValues,
          ...data,
        });

        this.hourlyAttendanceService
          .update(req.params.id, updatedHourlyAttendance)
          .then(() => res.status(200).json(updatedHourlyAttendance))
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `Hourly Attendance id:${req.params.id} does not exists`,
        });
    });
  }

  delete(req: Request, res: Response) {
    this.hourlyAttendanceService.get(req.params.id).then((hourlyAttendance) => {
      if (hourlyAttendance) {
        this.hourlyAttendanceService
          .delete(req.params.id)
          .then((hourlyAttendance) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `Hourly Attendance id:${req.params.id} does not exists`,
        });
    });
  }
}
