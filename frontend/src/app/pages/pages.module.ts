import { HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "./../components/components.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PagesRoutingModule } from "./pages.routing.module";
import { NgZorroModule } from "../NgZorro.module";
import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { DayAttendanceComponent } from "./day-attendance/day-attendance.component";
import { HourlyAttendanceComponent } from "./hourly-attendance/hourly-attendance.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SectionsComponent } from "./sections/sections.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SubjectsComponent } from "./subjects/subjects.component";
import { StudentsComponent } from "./students/students.component";

@NgModule({
  declarations: [
    BaseLayoutComponent,
    DayAttendanceComponent,
    HourlyAttendanceComponent,
    DashboardComponent,
    SectionsComponent,
    SubjectsComponent,
    StudentsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgZorroModule,
  ],
})
export class PagesModule {}
