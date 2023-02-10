import { Request, Response } from "express";
import { TimeTableService } from "../services";
import { Section, Subject, TimeTable } from "../models";

export class TimeTableController {
  private timeTableService: TimeTableService;

  private getOptions = {
    include: [
      { model: Section, as: "section" },
      { model: Subject, as: "period1Subject" },
      { model: Subject, as: "period2Subject" },
      { model: Subject, as: "period3Subject" },
      { model: Subject, as: "period4Subject" },
      { model: Subject, as: "period5Subject" },
      { model: Subject, as: "period6Subject" },
      { model: Subject, as: "period7Subject" },
      { model: Subject, as: "period8Subject" },
    ],
  };

  private formatTimeTable(timeTable: any) {
    delete timeTable.dataValues.sectionId;
    delete timeTable.dataValues.period1SubjectId;
    delete timeTable.dataValues.period2SubjectId;
    delete timeTable.dataValues.period3SubjectId;
    delete timeTable.dataValues.period4SubjectId;
    delete timeTable.dataValues.period5SubjectId;
    delete timeTable.dataValues.period6SubjectId;
    delete timeTable.dataValues.period7SubjectId;
    delete timeTable.dataValues.period8SubjectId;
    return timeTable;
  }

  private assignTimeTable(timeTable: any) {
    timeTable.sectionId = timeTable.section;
    timeTable.period1SubjectId = timeTable.period1Subject;
    timeTable.period2SubjectId = timeTable.period2Subject;
    timeTable.period3SubjectId = timeTable.period3Subject;
    timeTable.period4SubjectId = timeTable.period4Subject;
    timeTable.period5SubjectId = timeTable.period5Subject;
    timeTable.period6SubjectId = timeTable.period6Subject;
    timeTable.period7SubjectId = timeTable.period7Subject;
    timeTable.period8SubjectId = timeTable.period8Subject;
    delete timeTable.section;
    delete timeTable.period1Subject;
    delete timeTable.period2Subject;
    delete timeTable.period3Subject;
    delete timeTable.period4Subject;
    delete timeTable.period5Subject;
    delete timeTable.period6Subject;
    delete timeTable.period7Subject;
    delete timeTable.period8Subject;
    return timeTable;
  }

  constructor() {
    this.timeTableService = new TimeTableService(TimeTable);
  }

  getAll(req: Request, res: Response) {
    this.timeTableService.getAll(this.getOptions).then((timeTables) => {
      timeTables?.forEach((t) => {
        this.formatTimeTable(t);
      });
      res.status(200).json(timeTables);
    });
  }

  getById(req: Request, res: Response) {
    this.timeTableService
      .get(req.params.id, this.getOptions)
      .then((timeTable) => {
        if (timeTable) res.status(200).json(this.formatTimeTable(timeTable));
        else
          res.status(404).json({
            message: `Time Table id:${req.params.id} does not exists`,
          });
      });
  }

  post(req: Request, res: Response) {
    let data = this.assignTimeTable(req.body);

    let timeTable = new TimeTable(data);
    this.timeTableService
      .create(timeTable)
      .then((timeTable) => res.status(201).json(timeTable))
      .catch((err) => res.status(400).json(err.errors));
  }

  update(req: Request, res: Response) {
    let data = this.assignTimeTable(req.body);

    this.timeTableService.get(req.params.id).then((timeTable) => {
      if (timeTable) {
        let updatedTimeTable = new TimeTable({
          ...timeTable.dataValues,
          ...data,
        });

        this.timeTableService
          .update(req.params.id, updatedTimeTable)
          .then(() => res.status(200).json(updatedTimeTable))
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `Time Table id:${req.params.id} does not exists` });
    });
  }

  delete(req: Request, res: Response) {
    this.timeTableService.get(req.params.id).then((timeTable) => {
      if (timeTable) {
        this.timeTableService
          .delete(req.params.id)
          .then((timeTable) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `Time Table id:${req.params.id} does not exists` });
    });
  }
}
