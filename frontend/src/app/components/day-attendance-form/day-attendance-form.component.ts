import { HttpClient } from "@angular/common/http";
import { formatDate } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/helpers/data.service";

@Component({
  selector: "day-attendance-form",
  templateUrl: "./day-attendance-form.component.html",
  styleUrls: ["./day-attendance-form.component.scss"],
})
export class DayAttendanceFormComponent implements OnInit {
  form: FormGroup;

  students: any[];

  sections: any[];
  _students: any[];

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private http: HttpClient
  ) {}

  get studentS() {
    return this._students;
  }

  set studentS(st: any) {
    this._students = st;
    if (!st) this.form.controls["student"];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: null,
      department: [{ value: "CSE", disabled: true }, [Validators.required]],
      sectionId: [null, [Validators.required]],
      studentId: [null, [Validators.required]],
      date: [{ value: null, disabled: true }, [Validators.required]],
      absent: [true, [Validators.required]],
    });

    this.data.getDate().subscribe((date) => {
      this.form.controls["date"].setValue(date);
    });

    this.form.controls["date"].valueChanges.subscribe((date) => {
      let sec = this.form.controls["sectionId"];
      this.getStudents(sec.value, date);
    });

    this.form.controls["sectionId"].valueChanges.subscribe((sec) => {
      let date = this.form.controls["date"];
      this.getStudents(sec, date.value);
    });

    this.http
      .get(`http://localhost:3000/api/sections`)
      .subscribe((sections: any) => {
        this.sections = sections;
        this.form.controls["sectionId"].setValue(sections[0].id);
        this.form.controls["date"].setValue(new Date());
      });
  }
  getStudents(sec: number, date: Date) {
    let Fdate = formatDate(date, "yyyy-MM-dd", "en");
    this.http
      .get<any[]>(
        `http://localhost:3000/api/students/day-present?sec=${sec}&date=${Fdate}`
      )
      .subscribe((data: any) => {
        this.students = data;
        if (data.length > 0) this.form.controls["studentId"].enable();
        else this.form.controls["studentId"].disable();
      });
  }
  submit() {
    console.log(this.form.value);
  }
}
