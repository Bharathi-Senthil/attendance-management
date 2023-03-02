import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/helpers/data.service";
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Student } from "src/app/models";

@Component({
  selector: "day-attendance-form",
  templateUrl: "./day-attendance-form.component.html",
  styleUrls: ["./day-attendance-form.component.scss"],
})
export class DayAttendanceFormComponent implements OnInit {
  form: FormGroup;

  students: Student[];

  user = JSON.parse(String(localStorage.getItem("user")));

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private http: HttpClient
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

    this.data.getDate().subscribe((date) => {
      this.form.controls["date"].setValue(date);
    });

    this.form.controls["date"].valueChanges.subscribe((date) => {
      this.getStudents(date);
    });
    this.form.controls["date"].setValue(new Date());
  }
  getStudents(date: Date) {
    let Fdate = formatDate(date, "yyyy-MM-dd", "en");
    this.http
      .get<Student[]>(
        `http://localhost:3000/api/students/day-present?mentor=${this.user.id}&date=${Fdate}`
      )
      .subscribe((data: Student[]) => {
        this.students = data;
        if (data.length > 0) this.form.controls["studentId"].enable();
        else this.form.controls["studentId"].disable();
      });
  }
  submit() {
    if (this.form.valid && this.form.controls["studentId"].value.length > 0) {
      let data = this.form.getRawValue();
      data.date = formatDate(data.date, "yyyy-MM-dd", "en");
      this.http
        .post(`http://localhost:3000/api/day-attendances`, data)
        .subscribe((data) => {
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
