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

  total: number;
  pageSize = 5;
  pageIndex = 1;

  studentId = -1;

  sections: any[];

  section = new FormControl(null, [Validators.required]);

  _search = "";
  debounce: any;

  public get search(): string {
    return this._search;
  }

  public set search(v: string) {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this._search = v;
      this.getStudents();
    }, 300);
  }

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
    this.isLoading = !this.isLoading;
    this.http
      .get(
        `http://localhost:3000/api/students/page?page=${this.pageIndex}&size=${this.pageSize}&search=${this.search}`
      )
      .subscribe(
        (res: any) => {
          this.isLoading = !this.isLoading;
          this.students = res.data;
          this.total = res.totalItems;
        },
        (err) => (this.isLoading = !this.isLoading)
      );
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
