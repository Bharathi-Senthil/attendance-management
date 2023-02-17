import { FadeInOut } from "../../animations";
import { Component } from "@angular/core";

@Component({
  selector: "day-attendance",
  templateUrl: "./day-attendance.component.html",
  styleUrls: ["./day-attendance.component.scss"],
  animations: [FadeInOut],
})
export class DayAttendanceComponent {}
