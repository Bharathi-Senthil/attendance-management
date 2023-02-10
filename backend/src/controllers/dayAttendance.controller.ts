import { Request, Response } from "express";
import { DayAttendanceService } from "../services";
import { DayAttendance, Student } from "../models";

export class DayAttendanceController {
  private dayAttendanceService: DayAttendanceService;

  private getOptions = {
    include: [{ model: Student, as: "student" }],
  };

  private formatDayAttendance(dayAttendance: any) {
    delete dayAttendance.dataValues.studentId;
    return dayAttendance;
  }

  private assignDayAttendance(dayAttendance: any) {
    dayAttendance.studentId = dayAttendance.student;
    delete dayAttendance.subject;
    delete dayAttendance.student;
    return dayAttendance;
  }

  constructor() {
    this.dayAttendanceService = new DayAttendanceService(DayAttendance);
  }

  getAll(req: Request, res: Response) {
    this.dayAttendanceService.getAll(this.getOptions).then((dayAttendance) => {
      dayAttendance?.forEach((a) => {
        this.formatDayAttendance(a);
      });
      res.status(200).json(dayAttendance);
    });
  }

  getById(req: Request, res: Response) {
    this.dayAttendanceService
      .get(req.params.id, this.getOptions)
      .then((dayAttendance) => {
        if (dayAttendance)
          res.status(200).json(this.formatDayAttendance(dayAttendance));
        else
          res.status(404).json({
            message: `Day Attendance id:${req.params.id} does not exists`,
          });
      });
  }

  post(req: Request, res: Response) {
    let data = this.assignDayAttendance(req.body);

    console.log(data);

    let dayAttendance = new DayAttendance(data);
    this.dayAttendanceService
      .create(dayAttendance)
      .then((dayAttendance) => res.status(201).json(dayAttendance))
      .catch((err) => res.status(400).json(err.errors));
  }

  update(req: Request, res: Response) {
    let data = this.assignDayAttendance(req.body);

    this.dayAttendanceService.get(req.params.id).then((dayAttendance) => {
      if (dayAttendance) {
        let updatedDayAttendance = new DayAttendance({
          ...dayAttendance.dataValues,
          ...data,
        });

        this.dayAttendanceService
          .update(req.params.id, updatedDayAttendance)
          .then(() => res.status(200).json(updatedDayAttendance))
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `Day Attendance id:${req.params.id} does not exists`,
        });
    });
  }

  delete(req: Request, res: Response) {
    this.dayAttendanceService.get(req.params.id).then((dayAttendance) => {
      if (dayAttendance) {
        this.dayAttendanceService
          .delete(req.params.id)
          .then((dayAttendance) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res.status(404).json({
          message: `Day Attendance id:${req.params.id} does not exists`,
        });
    });
  }
}
