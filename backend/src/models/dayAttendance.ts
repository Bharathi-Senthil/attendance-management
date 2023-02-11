import { Student } from ".";
import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class DayAttendance extends Model {}

DayAttendance.init(
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
    studentId: {
      field: "student_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
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
    modelName: "day_attendance",
    timestamps: false,
  }
);

DayAttendance.belongsTo(Student, { foreignKey: "student_id", as: "student" });

Student.hasMany(DayAttendance, { foreignKey: "student_id" });
