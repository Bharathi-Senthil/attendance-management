import { NzMessageService } from "ng-zorro-antd/message";
import { FadeInOut } from "../../animations";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { uploadCsv } from "src/app/helpers";
import { Mentor, Section, Student } from "src/app/models";

import { NzModalService } from "ng-zorro-antd/modal";

import { environment } from "src/environments/environment";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
  animations: [FadeInOut],
})
export class StudentsComponent implements OnInit {
  students: Student[];
  mentors: any[] = [{ text: "Not Assigned", value: null }];

  isLoading = false;

  total: number;
  pageSize = 10;
  pageIndex = 1;
  filter = [];

  studentId = -1;

  sections: any[] = [];

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

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.http
      .get<Section[]>(`${environment.apiUrl}/sections`)
      .subscribe((data: Section[]) => {
        this.sections = data.map((s) => ({ text: s.name, value: s.id }));
        this.isLoading = false;
      });
    this.isLoading = true;
    this.http
      .get<Mentor[]>(`${environment.apiUrl}/users`)
      .subscribe((users) => {
        users.map((u) => {
          this.mentors.push({ text: u.name, value: u.id });
        });
        this.isLoading = false;
      });
  }

  promote() {
    this.modal.confirm({
      nzTitle: "Are you REALLY sure want to promote the Students?",
      // nzContent:
      //   '<b style="color: red;">Note: In case you accidentally deleted the data, please don\'t ever try to contact us.</b>',
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => {
        this.http
          .get(`${environment.apiUrl}/promotion`)
          .subscribe((data: any) => {
            this.message.success("Students promoted successfully");
            this.getStudents();
          });
      },
      nzCancelText: "No",
      nzOnCancel: () => console.log("Cancel"),
    });
  }


  visible: boolean = false;
  resetDate:Date;
  resetYear:number;
  reset() {
    this.http
      .delete(`${environment.apiUrl}/reset?date=${formatDate(this.resetDate,"yyyy-MM-dd","en")}&year=${this.resetYear}`)
      .subscribe((data: any) => {
        this.message.success("Reset successfully");
        this.getStudents();
      });
  }

  getStudents(p?: any) {
    let params = new HttpParams()
      .append("page", `${this.pageIndex}`)
      .append("size", `${this.pageSize}`)
      .append("search", `${this.search}`);
    let url = `${environment.apiUrl}/students/page?page=${this.pageIndex}&size=${this.pageSize}&search=${this.search}`;
    if (p) this.filter = p.filter;

    if (this.filter) {
      url += `&filter[]=${this.filter}`;
      this.filter.forEach((filter: { value: any[]; key: string }) => {
        filter.value?.forEach((value) => {
          params = params.append(filter.key, value);
        });
      });
    }
    this.isLoading = true;
    this.http
      .get<{ data: Student[]; totalItems: number }>(
        `${environment.apiUrl}/students/page`,
        { params }
      )
      .subscribe(
        (res: { data: Student[]; totalItems: number }) => {
          this.isLoading = false;
          this.students = res.data;
          this.total = res.totalItems;
        },
        (err) => (this.isLoading = false)
      );
  }

  deleteStudent(id: number) {
    this.http
      .delete(`${environment.apiUrl}/students/${id}`)
      .subscribe((data: any) => {
        this.message.success("Student deleted successfully");
        this.getStudents();
      });
  }

  handleUpload(file: any) {
    uploadCsv(file).subscribe((students) => {
      students.forEach((s: any) => {
        s["sectionId"] = this.section.value;
        s["yearId"] = this.year.value;
        file.value = null;
        console.log(file.value);
      });
      this.http
        .post(`${environment.apiUrl}/students`, students)
        .subscribe((data: any) => {
          this.message.success("Students added successfully");
          this.getStudents();
        });
    });
  }
}
