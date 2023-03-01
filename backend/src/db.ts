import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  "attendance-management",
  process.env.DBUSER ? process.env.DBUSER : "",
  process.env.PASSWORD ? process.env.PASSWORD : "",
  {
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false,
  }
);
