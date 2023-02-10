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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
    isAbsent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "hourly-attendance",
    timestamps: false,
  }
);

HourlyAttendance.belongsTo(Student, { foreignKey: "studentId", as: "student" });
HourlyAttendance.belongsTo(Subject, { foreignKey: "subjectId", as: "subject" });

Student.hasMany(HourlyAttendance, { foreignKey: "studentId" });
Subject.hasMany(HourlyAttendance, { foreignKey: "subjectId" });
