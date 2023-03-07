import bcrypt from "bcryptjs";
import { UserRoutes } from "./routes/user.routes";
import express from "express";
import cors from "cors";
import { sequelize } from "./db";
import {
  DayAttendanceRoutes,
  HourlyAttendanceRoutes,
  ReportRoutes,
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
  SubjectSectionHours,
  User,
  Year,
} from "./models";
import { verifyToken } from "./middleware";

const app = express();

const allowlist = [
  "http://localhost:4200",
  "http://localhost",
  /^http:\/\/172\.16\.5\.\d{1,3}:88$/,
];

const corsOptions: any = {
  origin: function (origin: string, callback: any) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowlist.some((pattern) => new RegExp(pattern).test(origin))) {
      callback(null, true);
    } else {
      callback(new Error("Unauthorized"));
    }
  },
};

app.use(cors(corsOptions));

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

User.sync().then(() => {
  User.findOne({ where: { email: "admin@local.com" } }).then((user) => {
    if (!user)
      bcrypt.hash("admin@123", 10).then((ep) => {
        User.create({
          name: "Admin",
          email: "admin@local.com",
          password: ep,
          role: "ADMIN",
        });
      });
  });
});
Year.sync().then(() => {
  Year.count().then((res) => {
    if (res < 4) {
      Year.sync({ force: true }).then(() => {
        Year.bulkCreate([
          { name: "I" },
          { name: "II" },
          { name: "III" },
          { name: "IV" },
        ]);
      });
    }
  });
});
// Section.sync({ force: true });
// Subject.sync({ force: true });
// TimeTable.sync({ force: true });
// Student.sync({ force: true });
// HourlyAttendance.sync({ force: true });
// DayAttendance.sync({ force: true });
// SubjectSectionHours.sync({ force: true });

// this is the raw query

let query = `SELECT a.student_id, a.student_name, a.roll_no,
                  a.section_name,
                  sum(a.sub1_tot_hrs) sub1_tot_hrs,
                  sum(a.sub1_abs_hrs) sub1_abs_hrs,
                  sum(a.sub1_tot_hrs) - sum(a.sub1_abs_hrs) sub1_pre_hrs,
                  
                  sum(a.sub2_tot_hrs) sub2_tot_hrs,
                  sum(a.sub2_abs_hrs) sub2_abs_hrs,
                  
                  sum(a.sub3_tot_hrs) sub3_tot_hrs,
                  sum(a.sub3_abs_hrs) sub3_abs_hrs,
                  
                  sum(a.sub4_tot_hrs) sub4_tot_hrs,
                  sum(a.sub4_abs_hrs) sub4_abs_hrs,
                  
                  sum(a.sub5_tot_hrs) sub5_tot_hrs,
                  sum(a.sub5_abs_hrs) sub5_abs_hrs,
                  
                  sum(a.sub6_tot_hrs) sub6_tot_hrs,
                  sum(a.sub6_abs_hrs) sub6_abs_hrs
              FROM
              (
                SELECT s.id student_id, s.name student_name, s.roll_no,
                    sec.name section_name,
                    sum(case when sub.name = 'Sub1' then ssh.total_hours else 0 end) sub1_tot_hrs,
                    count(case when sub.name = 'Sub1' then ha.is_absent else null end) sub1_abs_hrs,
                    
                    sum(case when sub.name = 'Sub2' then ssh.total_hours else 0 end) sub2_tot_hrs,
                    count(case when sub.name = 'Sub2' then ha.is_absent else null end) sub2_abs_hrs,
                    
                    sum(case when sub.name = 'Sub3' then ssh.total_hours else 0 end) sub3_tot_hrs,
                    count(case when sub.name = 'Sub3' then ha.is_absent else null end) sub3_abs_hrs,
                    
                    sum(case when sub.name = 'Sub4' then ssh.total_hours else 0 end) sub4_tot_hrs,
                    count(case when sub.name = 'Sub4' then ha.is_absent else null end) sub4_abs_hrs,
                    
                    sum(case when sub.name = 'Sub5' then ssh.total_hours else 0 end) sub5_tot_hrs,
                    count(case when sub.name = 'Sub5' then ha.is_absent else null end) sub5_abs_hrs,
                    
                    sum(case when sub.name = 'Sub6' then ssh.total_hours else 0 end) sub6_tot_hrs,
                    count(case when sub.name = 'Sub6' then ha.is_absent else null end) sub6_abs_hrs
                    -- sum(case when sub.name = 'Sub1' then count(ha.is_absent) else 0 end) sub1_abs_hrs
                    -- ssh.total_hours  - count(ha.is_absent) pre_hours
                    -- count(case when ha.is_absent is null then 1 else null end) pre_hours
                  from students s cross join subjects sub
                  inner join sections sec on s.section_id = sec.id 
                  LEFT join hourly_attendances ha on s.id = ha.student_id and ha.subject_id = sub.id 
                  LEFT JOIN subject_section_hours ssh on ssh.subject_id = sub.id and ssh.section_id = sec.id 
                  -- WHERE sub.name = 'Sub1'
                  GROUP BY s.id, sec.id
                  ORDER BY s.name
              ) a
              GROUP BY a.student_id, a.section_name
              ORDER BY a.student_name
`;

app.use(express.json());

app.use(express.static(__dirname + "/attendance-management", { index: false }));
app.get(/^((?!(api)).)*$/, function (req, res) {
  res.sendFile(__dirname + "/attendance-management/index.html");
});

app.use("/api/users", new UserRoutes().getRouter());
app.use("/api/sections", verifyToken, new SectionRoutes().getRouter());
app.use("/api/subjects", verifyToken, new SubjectRoutes().getRouter());
app.use("/api/time-tables", verifyToken, new TimeTableRoutes().getRouter());
app.use("/api/students", verifyToken, new StudentRoutes().getRouter());
app.use(
  "/api/hourly-attendances",
  verifyToken,
  new HourlyAttendanceRoutes().getRouter()
);
app.use(
  "/api/day-attendances",
  verifyToken,
  new DayAttendanceRoutes().getRouter()
);
app.use(
  "/api/subject-section-hours",
  verifyToken,
  new SubjectSectionHoursRoutes().getRouter()
);

app.use("/api/report", verifyToken, new ReportRoutes().getRouter());

app.get("/api/hourly-report", (req, res) => {
  sequelize.query(query).then((data) => {
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log("App listening on port http://localhost:3000");
});
