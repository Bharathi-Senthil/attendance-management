import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransferItem } from "ng-zorro-antd/transfer";
import { Student } from "src/app/models";
import { environment } from "src/environments/environment";

@Component({
  selector: "day-attendance-form",
  templateUrl: "./day-attendance-form.component.html",
  styleUrls: ["./day-attendance-form.component.scss"],
})
export class DayAttendanceFormComponent implements OnInit {
  list: Array<TransferItem & { rollNo: string; name: string }> = [];

  user = JSON.parse(String(localStorage.getItem("user")));

  students: Student[];
  absentees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.form.controls["date"].value,
    let Fdate = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.http
      .get<Student[]>(
        `${environment.apiUrl}/students/day-present?mentor=${this.user.id}&date=2023-01-01`
      )
      .subscribe((data: any) => {
        console.log(data);
        this.students = data.preStudents;
        this.absentees = data.absStudents;
        this.getData(data);
      });
  }

  getData(data: any): void {
    let { preStudents, absStudents } = data;
    // ret.push({
    //     key: i.toString(),
    //     title: `content${i + 1}`,
    //     direction: Math.random() * 2 > 1 ? "right" : undefined,
    //     rollNo: `description of content${i + 1}`,
    //     name: `description of content${i + 1}`,
    //   });
    preStudents.forEach((s: any) => {
      this.list.push({
        key: s.id,
        title: s.name,
        direction: "left",
        rollNo: s.rollNo,
        name: s.name,
      });
    });
    absStudents.forEach((s: any) => {
      this.list.push({
        key: s.id,
        title: s.studentName,
        direction: "left",
        rollNo: s.studentRollNo,
        name: s.studentName,
      });
    });
  }
}
