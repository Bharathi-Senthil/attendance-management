import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  "attendance-management",
  process.env.USERNAME ? process.env.USERNAME : "",
  process.env.PASSWORD ? process.env.PASSWORD : "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
