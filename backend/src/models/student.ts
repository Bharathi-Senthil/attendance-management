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
      unique: { msg: "Roll No must be unique!", name: "rollNo" },
    },
    regNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Reg No must be unique!", name: "regNo" },
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
    underscored: true,
  }
);

Student.belongsTo(Section, {
  foreignKey: "sectionId",
  as: "section",
  onDelete: "cascade",
});
