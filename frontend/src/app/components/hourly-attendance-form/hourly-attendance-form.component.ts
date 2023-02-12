import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/helpers/data.service";

@Component({
  selector: "hourly-attendance-form",
  templateUrl: "./hourly-attendance-form.component.html",
  styleUrls: ["./hourly-attendance-form.component.scss"],
})
export class HourlyAttendanceFormComponent implements OnInit {
  form: FormGroup;

  sections: any[];
  students: any[];
  timeTable: any[];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private data: DataService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      id: null,
      date: [{ value: null, disabled: true }, [Validators.required]],
      department: [{ value: "CSE", disabled: true }, [Validators.required]],
      section: [null, [Validators.required]],
      student: [null, [Validators.required]],
      hour: [null, [Validators.required]],
      absent: [true, [Validators.required]],
    });
    this.data
      .getDate()
      .subscribe((date) => this.form.controls["date"].setValue(date));

    this.form.controls["section"].valueChanges.subscribe((data) => {
      this.getStudents(data);
      this.getTimeTable(data);
    });

    this.http
      .get("http://localhost:3000/api/sections")
      .subscribe((data: any) => {
        this.sections = data;
        this.form.controls["section"].setValue(data[0].id);
      });
  }

  getStudents(sec: number) {
    this.http
      .get(`http://localhost:3000/api/students?sec=${sec}`)
      .subscribe((data: any) => {
        console.log(data);
        this.students = data;
      });
  }

  getTimeTable(sec: number) {
    this.http
      .get(`http://localhost:3000/api/time-tables?sec=${sec}`)
      .subscribe((data: any) => {
        console.log(data);
        this.timeTable = data;
      });
  }

  submit() {
    console.log(this.form.value);
  }
}
