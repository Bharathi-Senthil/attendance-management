import { Section } from ".";
import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rollNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    regNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Section,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "student",
    timestamps: false,
  }
);

Student.belongsTo(Section, {
  foreignKey: "sectionId",
  as: "section",
});

Section.hasMany(Student, {
  foreignKey: "sectionId",
});
