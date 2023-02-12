import { Request, Response } from "express";
import { StudentService } from "../services";
import { Section, Student } from "../models";
import { Sequelize } from "sequelize";
import { getPagingData } from "../helpers";

export class StudentController {
  private studentService: StudentService;

  private options = {
    attributes: [
      "id",
      "name",
      "rollNo",
      "regNo",
      "sectionId",
      [Sequelize.col("section.name"), "sectionName"],
    ],
    include: [
      {
        model: Section,
        as: "section",
        attributes: [],
      },
    ],
  };

  constructor() {
    this.studentService = new StudentService(Student);
  }

  getPaged(req: Request, res: Response) {
    const { page, size } = req.query;
    this.studentService
      .getPaged(page, size, this.options)
      .then((students) => res.status(200).json(getPagingData(students)));
  }

  getAll(req: Request, res: Response) {
    const { sec } = req.query;
    let fOptions: any = { ...this.options };
    if (sec) fOptions = { ...fOptions, where: { sectionId: sec } };
    this.studentService
      .getAll(fOptions)
      .then((students) => res.status(200).json(students));
  }

  getById(req: Request, res: Response) {
    this.studentService.get(req.params.id, this.options).then((student) => {
      if (student) res.status(200).json(student);
      else
        res.status(404).json({
          message: `Student id:${req.params.id} does not exists`,
        });
    });
  }

  post(req: Request, res: Response) {
    let data = req.body;

    let student = new Student({ ...data });
    this.studentService
      .create(student)
      .then((student) => res.status(201).json(student))
      .catch((err) => res.status(400).json(err));
  }

  update(req: Request, res: Response) {
    let data = req.body;

    this.studentService.get(req.params.id).then((student) => {
      if (student) {
        let updatedStudent = new Student({
          ...student.dataValues,
          ...data,
        });

        this.studentService
          .update(req.params.id, updatedStudent)
          .then(() => res.status(200).json(updatedStudent))
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `Student id:${req.params.id} does not exists` });
    });
  }

  delete(req: Request, res: Response) {
    this.studentService.get(req.params.id).then((student) => {
      if (student) {
        this.studentService
          .delete(req.params.id)
          .then((student) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `Student id:${req.params.id} does not exists` });
    });
  }
}
