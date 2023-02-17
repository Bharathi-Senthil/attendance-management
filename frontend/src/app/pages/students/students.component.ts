import { FadeInOut } from "./../../animations";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { uploadCsv } from "src/app/helpers";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
  animations: [FadeInOut],
})
export class StudentsComponent implements OnInit {
  students: any[];
  isLoading = false;

  studentId = -1;

  sections: any[];

  section = new FormControl(null, [Validators.required]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get("http://localhost:3000/api/sections")
      .subscribe((data: any) => {
        this.sections = data;
      });
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

  handleUpload(file: any) {
    uploadCsv(file).subscribe((students) => {
      students.forEach((s: any) => {
        s["sectionId"] = this.section.value;
        file.value = null;
      });
      this.http
        .post("http://localhost:3000/api/students", students)
        .subscribe((data: any) => {
          this.getStudents();
        });
    });
  }
}
