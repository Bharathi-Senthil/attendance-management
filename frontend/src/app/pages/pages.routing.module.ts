import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChartComponent } from "../components/chart/chart.component";

import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { DayAttendanceComponent } from "./day-attendance/day-attendance.component";
import { HourlyAttendanceComponent } from "./hourly-attendance/hourly-attendance.component";
import { SectionsComponent } from "./sections/sections.component";
import { StudentsComponent } from "./students/students.component";
import { SubjectSectionHoursComponent } from "./subject-section-hours/subject-section-hours.component";
import { SubjectsComponent } from "./subjects/subjects.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "day-attendance",
        component: DayAttendanceComponent,
      },
      {
        path: "hourly-attendance",
        component: HourlyAttendanceComponent,
      },
      {
        path: "dashboard",
        component: ChartComponent,
      },
      {
        path: "sections",
        component: SectionsComponent,
      },
      {
        path: "subjects",
        component: SubjectsComponent,
      },
      {
        path: "students",
        component: StudentsComponent,
      },
      {
        path:"total-hours",
        component: SubjectSectionHoursComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
