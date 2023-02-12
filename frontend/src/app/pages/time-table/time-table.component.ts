import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-time-table",
  templateUrl: "./time-table.component.html",
  styleUrls: ["./time-table.component.scss"],
})
export class TimeTableComponent implements OnInit {
  students: any[];
  isLoading = false;

  studentId = -1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTimeTable();
  }

  getTimeTable() {
    this.http
      .get("http://localhost:3000/api/time-tables")
      .subscribe((data: any) => {
        this.students = data;
      });
  }

  deleteStudent(id: number) {
    this.http
      .delete(`http://localhost:3000/api/time-tables/${id}`)
      .subscribe((data: any) => this.getTimeTable());
  }
}
