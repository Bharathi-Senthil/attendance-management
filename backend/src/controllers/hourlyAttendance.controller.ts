import { Request, Response } from "express";
import { HourlyAttendanceService } from "../services";
import { HourlyAttendance, Section, Student, Subject } from "../models";
import { getPagingData } from "../helpers";

export class HourlyAttendanceController {
  private hourlyAttendanceService: HourlyAttendanceService;

  private options = {
    include: [
      {
        model: Student,
        as: "student",
        include: [{ model: Section, as: "section" }],
      },
      { model: Subject, as: "subject" },
    ],
  };

  constructor() {
    this.hourlyAttendanceService = new HourlyAttendanceService(
      HourlyAttendance
    );
  }

  getAll(req: Request, res: Response) {
    const { page, size } = req.query;
    this.hourlyAttendanceService
      .getAll(page, size, this.options)
      .then((hourlyAttendances) => {
        res.status(200).json(getPagingData(hourlyAttendances));
      });
  }

  getById(req: Request, res: Response) {
    this.hourlyAttendanceService
      .get(req.params.id, this.options)
      .then((hourlyAttendance) => {
        if (hourlyAttendance) res.status(200).json(hourlyAttendance);
        else
          res.status(404).json({
            message: `Hourly Attendance id:${req.params.id} does not exists`,
          });
      });
  }

  post(req: Request, res: Response) {
    let data = req.body;

    console.log(data);

    let hourlyAttendance = new HourlyAttendance(data);
    this.hourlyAttendanceService
      .create(hourlyAttendance)
      .then((hourlyAttendance) => res.status(201).json(hourlyAttendance))
      .catch((err) => res.status(400).json(err.errors));
  }

  update(req: Request, res: Response) {
    let data = req.body;

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
