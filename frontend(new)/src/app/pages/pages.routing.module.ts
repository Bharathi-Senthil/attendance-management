import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
// import { ListAttendanceComponent } from './list-attendance/list-attendance.component';
import { AttendanceFromComponent } from '../components/attendance-from/attendance-from.component';
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'attendance',
        component: AttendanceFromComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
