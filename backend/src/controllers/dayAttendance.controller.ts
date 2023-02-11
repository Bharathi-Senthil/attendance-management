import { Request, Response } from "express";
import { DayAttendanceService } from "../services";
import { DayAttendance, Student, Section } from "../models";
import { getPagingData } from "../helpers";

export class DayAttendanceController {
  private dayAttendanceService: DayAttendanceService;

  constructor() {
    this.dayAttendanceService = new DayAttendanceService(DayAttendance);
  }

  private options = {
    include: [
      {
        model: Student,
        as: "student",
        include: [{ model: Section, as: "section" }],
      },
    ],
  };

  getAll(req: Request, res: Response) {
    const { page, size } = req.query;
    this.dayAttendanceService
      .getAll(page, size, this.options)
      .then((dayAttendance) => {
        res.status(200).json(getPagingData(dayAttendance));
      });
  }

  getById(req: Request, res: Response) {
    this.dayAttendanceService
      .get(req.params.id, this.options)
      .then((dayAttendance) => {
        if (dayAttendance) res.status(200).json(dayAttendance);
        else
          res.status(404).json({
            message: `Day Attendance id:${req.params.id} does not exists`,
          });
      });
  }

  post(req: Request, res: Response) {
    let data = req.body;

    console.log(data);

    let dayAttendance = new DayAttendance(data);
    this.dayAttendanceService
      .create(dayAttendance)
      .then((dayAttendance) => res.status(201).json(dayAttendance))
      .catch((err) => res.status(400).json(err.errors));
  }

  update(req: Request, res: Response) {
    let data = req.body;

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
