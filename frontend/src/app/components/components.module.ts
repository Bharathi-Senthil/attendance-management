import { NgZorroModule } from "./../NgZorro.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SiderComponent } from "./sider/sider.component";
import { DayAttendanceFormComponent } from "./day-attendance-form/day-attendance-form.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { HourlyAttendanceFormComponent } from "./hourly-attendance-form/hourly-attendance-form.component";
import { ChartComponent } from "./chart/chart.component";
import { StudentFormComponent } from "./student-form/student-form.component";
import { TimeTableFormComponent } from "./time-table-form/time-table-form.component";
import { MentorFormComponent } from "./mentor-form/mentor-form.component";

@NgModule({
  declarations: [
    SiderComponent,
    DayAttendanceFormComponent,
    CalendarComponent,
    HourlyAttendanceFormComponent,
    ChartComponent,
    StudentFormComponent,
    TimeTableFormComponent,
    MentorFormComponent,
  ],
  exports: [
    SiderComponent,
    DayAttendanceFormComponent,
    HourlyAttendanceFormComponent,
    CalendarComponent,
    ChartComponent,
    StudentFormComponent,
    TimeTableFormComponent,
    MentorFormComponent,
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
