import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AttendanceFromComponent } from "./attendance-from/attendance-from.component";
import { SidebarComponent } from "./sider/sider.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SidebarComponent, AttendanceFromComponent],
  exports: [SidebarComponent, AttendanceFromComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ComponentsModule {}
