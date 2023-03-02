import { FadeInOut } from "../../animations";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { uploadCsv } from "src/app/helpers";
import { Section, Student } from "src/app/models";
import { listOfColumns } from "./studentHeader";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
  animations: [FadeInOut],
})
export class StudentsComponent implements OnInit {
  studentColumn = listOfColumns;
  students: Student[];

  isLoading = false;

  total: number;
  pageSize = 10;
  pageIndex = 1;
  filter = [];

  studentId = -1;

  sections: Section[];

  section = new FormControl(null, [Validators.required]);
  year = new FormControl(null, [Validators.required]);

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
      .get<Section[]>("http://localhost:3000/api/sections")
      .subscribe((data: Section[]) => {
        this.sections = data;
      });
  }

  getStudents(p?: any) {
    let params = new HttpParams()
      .append("page", `${this.pageIndex}`)
      .append("size", `${this.pageSize}`)
      .append("search", `${this.search}`);
    let url = `http://localhost:3000/api/students/page?page=${this.pageIndex}&size=${this.pageSize}&search=${this.search}`;
    if (p) this.filter = p.filter;

    if (this.filter) {
      url += `&filter[]=${this.filter}`;
      this.filter.forEach((filter: { value: any[]; key: string }) => {
        filter.value.forEach((value) => {
          params = params.append(filter.key, value);
        });
      });
    }
    this.isLoading = !this.isLoading;
    this.http
      .get<{ data: Student[]; totalItems: number }>(
        "http://localhost:3000/api/students/page",
        { params }
      )
      .subscribe(
        (res: { data: Student[]; totalItems: number }) => {
          console.log(res);
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
        s["yearId"] = this.year.value;
        file.value = null;
      });
      console.log(students);
      this.http
        .post("http://localhost:3000/api/students", students)
        .subscribe((data: any) => {
          this.getStudents();
        });
    });
  }
}
