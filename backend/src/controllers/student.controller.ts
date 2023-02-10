import { Request, Response } from "express";
import { StudentService } from "../services";
import { Section, Student } from "../models";

export class StudentController {
  private studentService: StudentService;

  private getOptions = {
    include: [{ model: Section, as: "section" }],
  };

  private formatStudent(student: any) {
    delete student.dataValues.sectionId;
    return student;
  }

  private assignStudent(student: any) {
    student.sectionId = student.section;
    delete student.section;
    return student;
  }

  constructor() {
    this.studentService = new StudentService(Student);
  }

  getAll(req: Request, res: Response) {
    this.studentService.getAll(this.getOptions).then((students) => {
      students?.forEach((s) => {
        this.formatStudent(s);
      });
      res.status(200).json(students);
    });
  }

  getById(req: Request, res: Response) {
    this.studentService.get(req.params.id, this.getOptions).then((student) => {
      if (student) res.status(200).json(this.formatStudent(student));
      else
        res.status(404).json({
          message: `Student id:${req.params.id} does not exists`,
        });
    });
  }

  post(req: Request, res: Response) {
    let data = this.assignStudent(req.body);

    let student = new Student(data);
    this.studentService
      .create(student)
      .then((student) => res.status(201).json(student))
      .catch((err) => res.status(400).json(err.errors));
  }

  update(req: Request, res: Response) {
    let data = this.assignStudent(req.body);

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
