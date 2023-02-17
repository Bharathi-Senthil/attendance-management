import { User } from "./../models/user";
import { Request, Response } from "express";
import { StudentService, HourlyAttendanceService } from "../services";
import {
  Section,
  Student,
  HourlyAttendance,
  DayAttendance,
  Subject,
} from "../models";
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
      [Sequelize.col("mentor.id"), "mentorId"],
      [Sequelize.col("mentor.name"), "mentorName"],
    ],
    include: [
      {
        model: Section,
        as: "section",
        attributes: [],
      },
      { model: User, as: "mentor", attributes: [] },
    ],
  };

  private hourlyOptions = {
    attributes: [
      "id",
      "date",
      "hour",
      "isAbsent",
      [Sequelize.col("subject.id"), "subjectId"],
      [Sequelize.col("subject.name"), "subjectName"],
      [Sequelize.col("subject.code"), "subjectCode"],
      "studentId",
      [Sequelize.col("student.name"), "studentName"],
      [Sequelize.col("student.roll_no"), "studentRollNo"],
      [Sequelize.col("student.reg_no"), "studentRegNo"],
      [Sequelize.col("student.section_id"), "studentSectionId"],
      [Sequelize.col("student.section.name"), "sectionName"],
    ],
    include: [
      {
        model: Student,
        as: "student",
        attributes: [],
        include: [
          {
            model: Section,
            as: "section",
          },
        ],
      },
      { model: Subject, as: "subject", attributes: [] },
    ],
  };

  private dayOptions = {
    attributes: [
      "id",
      "date",
      "isAbsent",
      "studentId",
      [Sequelize.col("student.name"), "studentName"],
      [Sequelize.col("student.roll_no"), "studentRollNo"],
      [Sequelize.col("student.reg_no"), "studentRegNo"],
      [Sequelize.col("student.section_id"), "studentSectionId"],
      [Sequelize.col("student.section.name"), "sectionName"],
    ],
    include: [
      {
        model: Student,
        as: "student",
        attributes: [],
        include: [
          {
            model: Section,
            as: "section",
          },
        ],
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
    const { sec, mentor } = req.query;
    let where = {};
    if (sec) where = { ...where, sectionId: sec };
    if (mentor) {
      if (mentor != "null") where = { ...where, mentorId: mentor };
      else where = { ...where, mentorId: null };
    }
    let fOptions: any = { ...this.options, where };
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

  getHourlyPresent(req: Request, res: Response) {
    const { hour, sec, date } = req.query;
    let preStudents: Student[];
    Student.findAll({ where: { sectionId: sec } }).then((students) => {
      preStudents = students;
      let options: any = this.hourlyOptions;
      if (hour && date)
        options = {
          ...options,
          where: {
            hour,
            date: new Date(String(date)),
          },
        };
      HourlyAttendance.findAll(options).then((absStudent) => {
        absStudent.forEach((abs) => {
          preStudents = preStudents.filter(
            (pre) => pre.dataValues.id != abs.dataValues.studentId
          );
        });
        res.status(200).json(preStudents);
      });
    });
  }

  getDayPresent(req: Request, res: Response) {
    const { sec, date } = req.query;
    let preStudents: Student[];
    Student.findAll({ where: { sectionId: sec } }).then((students) => {
      preStudents = students;
      let options: any = this.dayOptions;
      if (date)
        options = {
          ...options,
          where: {
            date: new Date(String(date)),
          },
        };
      DayAttendance.findAll(options).then((absStudent) => {
        absStudent.forEach((abs) => {
          preStudents = preStudents.filter(
            (pre) => pre.dataValues.id != abs.dataValues.studentId
          );
        });
        res.status(200).json(preStudents);
      });
    });
  }

  post(req: Request, res: Response) {
    let data = req.body;

    if (data.length)
      Student.bulkCreate(data)
        .then((students) => res.status(201).json(students))
        .catch((err) => res.status(400).json(err));
    else {
      let student = new Student({ ...data });
      this.studentService
        .create(student)
        .then((student) => res.status(201).json(student))
        .catch((err) => res.status(400).json(err));
    }
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
