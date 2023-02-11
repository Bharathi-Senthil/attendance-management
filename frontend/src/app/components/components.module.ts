import { NgZorroModule } from "./../NgZorro.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SiderComponent } from "./sider/sider.component";
import { DayAttendanceFormComponent } from "./day-attendance-form/day-attendance-form.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { HourlyAttendanceFormComponent } from "./hourly-attendance-form/hourly-attendance-form.component";
import { DashboardComponent } from './dashboard-ui/dashboard-ui.component';

@NgModule({
  declarations: [
    SiderComponent,
    DayAttendanceFormComponent,
    CalendarComponent,
    HourlyAttendanceFormComponent,
    DashboardComponent,

  ],
  exports: [
    SiderComponent,
    DayAttendanceFormComponent,
    HourlyAttendanceFormComponent,
    CalendarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroModule,
  ],
})
export class ComponentsModule {}
