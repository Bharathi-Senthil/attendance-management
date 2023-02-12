import express from "express";
import cors from "cors";
import sequelize from "./db";
import {
  DayAttendanceRoutes,
  HourlyAttendanceRoutes,
  SectionRoutes,
  StudentRoutes,
  SubjectRoutes,
  SubjectSectionHoursRoutes,
  TimeTableRoutes,
} from "./routes";

import {
  Subject,
  Section,
  TimeTable,
  Student,
  HourlyAttendance,
  DayAttendance,
  SubjectSectionHours
} from "./models";

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));

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
// TimeTable.sync();
// Student.sync({ force: true });
// HourlyAttendance.sync({ force: true });
// DayAttendance.sync({ force: true });
// SubjectSectionHours.sync({ force: true });

app.use(express.json());

app.use("/api/sections", new SectionRoutes().getRouter());
app.use("/api/subjects", new SubjectRoutes().getRouter());
app.use("/api/time-tables", new TimeTableRoutes().getRouter());
app.use("/api/students", new StudentRoutes().getRouter());
app.use("/api/hourly-attendances", new HourlyAttendanceRoutes().getRouter());
app.use("/api/day-attendances", new DayAttendanceRoutes().getRouter());
app.use(
  "/api/subject-section-hours",
  new SubjectSectionHoursRoutes().getRouter()
);

app.listen(3000, () => {
  console.log("App listening on port http://localhost:3000");
});
