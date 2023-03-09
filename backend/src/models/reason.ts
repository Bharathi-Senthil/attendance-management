import { User } from "./user";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Reason extends Model {}

Reason.init(
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
    mentorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    reason: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "reason",
    timestamps: false,
    underscored: true,
  }
);

Reason.belongsTo(User, {
  foreignKey: "mentorId",
  as: "mentor",
  onDelete: "cascade",
});
