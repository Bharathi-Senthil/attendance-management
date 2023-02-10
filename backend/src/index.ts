import express from "express";
import sequelize from "./db";
import {
  SectionRoutes,
  StudentRoutes,
  SubjectRoutes,
  TimeTableRoutes,
} from "./routes";

import { Subject, Section, TimeTable, Student } from "./models";

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Section.sync({ force: true });
// Subject.sync({ force: true });
// TimeTable.sync({ force: true });
// Student.sync({ force: true });

app.use(express.json());

app.use("/api/sections", new SectionRoutes().getRouter());
app.use("/api/subjects", new SubjectRoutes().getRouter());
app.use("/api/time-tables", new TimeTableRoutes().getRouter());
app.use("/api/students", new StudentRoutes().getRouter());

app.listen(3000, () => {
  console.log("App listening on port http://localhost:3000");
});
