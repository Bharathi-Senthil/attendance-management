import { NzMessageService } from "ng-zorro-antd/message";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { FadeInOut } from "../../animations";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "day-attendance",
  templateUrl: "./day-attendance.component.html",
  styleUrls: ["./day-attendance.component.scss"],
  animations: [FadeInOut],
})
export class DayAttendanceComponent implements OnInit {
  absentees: any;

  selectedStudent: any;
  reason: string;
  parentMobile: number;

  constructor(private http: HttpClient, private message: NzMessageService) {}
  ngOnInit(): void {}

  onSelectedStudentChange() {
    let student = this.absentees.filter(
      (a: any) => a.id === this.selectedStudent
    )[0];
    this.reason = student.reason;
    this.parentMobile = student.parentMobile;
  }

  getAbsentees(absentees: any) {
    if (absentees) this.absentees = absentees;
    else this.absentees = null;

    if (absentees.length > 0) {
      this.selectedStudent = absentees[0].id;
      this.reason = absentees[0].reason;
      this.parentMobile = absentees[0].parentMobile;
    } else this.selectedStudent = 0;
  }

  addReason() {
    this.http
      .put(`${environment.apiUrl}/day-attendances/${this.selectedStudent}`, {
        id: this.selectedStudent,
        reason: this.reason,
      })
      .subscribe((res) => {
        this.message.success("Reason Added.");
      });
  }
}
