import { Student, Subject } from ".";
import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class HourlyAttendance extends Model {}

HourlyAttendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentId: {
      field: "student_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    subjectId: {
      field: "subject_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    isAbsent: {
      field: "is_absent",
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "hourly_attendance",
    timestamps: false,
  }
);

HourlyAttendance.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});
HourlyAttendance.belongsTo(Subject, {
  foreignKey: "subject_id",
  as: "subject",
});

Student.hasMany(HourlyAttendance, { foreignKey: "student_id" });
Subject.hasMany(HourlyAttendance, { foreignKey: "subject_id" });
