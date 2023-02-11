import { NgZorroModule } from "./../NgZorro.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SiderComponent } from "./sider/sider.component";
import { AttendanceFormComponent } from "./attendance-form/attendance-form.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { HourlyAttendanceComponent } from './hourly-attendance/hourly-attendance.component';

@NgModule({
  declarations: [SiderComponent, AttendanceFormComponent, CalendarComponent, HourlyAttendanceComponent],
  exports: [SiderComponent, AttendanceFormComponent, CalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroModule,
  ],
})
export class ComponentsModule {}
