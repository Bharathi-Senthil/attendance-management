import { ComponentsModule } from "./../components/components.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PagesRoutingModule } from "./pages.routing.module";
import { NgZorroModule } from "../NgZorro.module";
import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { DayAttendanceComponent } from "./day-attendance/day-attendance.component";
import { HourlyAttendanceComponent } from './hourly-attendance/hourly-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [BaseLayoutComponent, DayAttendanceComponent, HourlyAttendanceComponent, DashboardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ComponentsModule,
    NgZorroModule,
  ],
})
export class PagesModule {}
