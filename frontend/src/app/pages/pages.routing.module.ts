import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChartComponent } from "../components/chart/chart.component";

import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { DayAttendanceComponent } from "./day-attendance/day-attendance.component";
import { HourlyAttendanceComponent } from "./hourly-attendance/hourly-attendance.component";

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
        path: 'dashboard',
        component:ChartComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
