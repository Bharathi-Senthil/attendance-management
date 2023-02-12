import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent implements OnInit {
  students: any[];
  isLoading = false;

  studentId = -1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.http
      .get("http://localhost:3000/api/students")
      .subscribe((data: any) => {
        this.students = data;
      });
  }

  deleteStudent(id: number) {
    this.http
      .delete(`http://localhost:3000/api/students/${id}`)
      .subscribe((data: any) => this.getStudents());
  }
}
