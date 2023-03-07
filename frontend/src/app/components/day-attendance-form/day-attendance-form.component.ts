import { NzMessageService } from "ng-zorro-antd/message";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/helpers/data.service";
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Student } from "src/app/models";

import { environment } from "src/environments/environment";

@Component({
  selector: "day-attendance-form",
  templateUrl: "./day-attendance-form.component.html",
  styleUrls: ["./day-attendance-form.component.scss"],
})
export class DayAttendanceFormComponent implements OnInit {
  form: FormGroup;

  students: Student[];
  absentees: any[] = [];

  user = JSON.parse(String(localStorage.getItem("user")));

  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private http: HttpClient,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: null,
      department: [{ value: "CSE", disabled: true }, [Validators.required]],
      studentId: [null, [Validators.required]],
      date: [{ value: null, disabled: true }, [Validators.required]],
      isAbsent: [true, [Validators.required]],
    });

    this.data.getDate().subscribe((date) => {
      this.form.controls["date"].setValue(date);
    });

    this.form.controls["date"].valueChanges.subscribe((date) => {
      this.getStudents();
    });
    this.form.controls["date"].setValue(new Date());
  }

  getStudents() {
    this.isLoading = true;
    let Fdate = formatDate(
      this.form.controls["date"].value,
      "yyyy-MM-dd",
      "en"
    );
    this.http
      .get<Student[]>(
        `${environment.apiUrl}/students/day-present?mentor=${this.user.id}&date=${Fdate}`
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.isLoading = false;
          this.students = data.preStudents;
          this.absentees = data.absStudents;
          if (data.preStudents.length > 0)
            this.form.controls["studentId"].enable();
          else this.form.controls["studentId"].disable();
        },
        (err) => (this.isLoading = false)
      );
  }

  deleteAttendance(id: number) {
    this.http
      .delete(`${environment.apiUrl}/day-attendances/${id}`)
      .subscribe((data) => {
        this.message.success("Attendance deleted successfully");
        this.getStudents();
      });
  }

  submit() {
    if (this.form.valid && this.form.controls["studentId"].value.length > 0) {
      let data = this.form.getRawValue();
      data.date = formatDate(data.date, "yyyy-MM-dd", "en");
      this.http
        .post(`${environment.apiUrl}/day-attendances`, data)
        .subscribe((data) => {
          this.message.success("Attendance added successfully");
          this.getStudents();
          this.form.controls["studentId"].reset();
        });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
