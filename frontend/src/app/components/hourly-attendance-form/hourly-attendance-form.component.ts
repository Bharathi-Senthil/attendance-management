import { formatDate } from "@angular/common";
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
  timeTables: any[];
  timeTable: any;

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
      sectionId: [null, [Validators.required]],
      studentId: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      hour: [null, [Validators.required]],
      absent: [true, [Validators.required]],
    });

    this.form.controls["subjectId"].disable();

    this.data.getDate().subscribe((date) => {
      this.form.controls["date"].setValue(date);
    });

    this.http
      .get("http://localhost:3000/api/sections")
      .subscribe((data: any) => {
        this.sections = data;
        this.http
          .get(`http://localhost:3000/api/time-tables?sec=${data[0].id}`)
          .subscribe((data: any) => {
            this.timeTables = data;
            this.form.controls["sectionId"].setValue(data[0].id);
            this.form.controls["date"].setValue(new Date());
          });
      });

    this.form.controls["sectionId"].valueChanges.subscribe((data) => {
      this.form.controls["hour"].reset();
      this.form.controls["subjectId"].reset();
      this.form.controls["studentId"].reset();
      this.timeTable = {};
      // this.getStudents(data);
      this.getTimeTables(data);
    });

    this.form.controls["date"].valueChanges.subscribe((date) => {
      let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      let day = days[date.getDay() - 1];
      if (this.timeTables)
        this.timeTable = this.timeTables.filter((t) => t.day === day)[0];
    });

    this.form.controls["hour"].valueChanges.subscribe((hour) => {
      if (hour)
        this.form.controls["subjectId"].setValue(
          this.timeTable["period" + hour + "SubjectId"]
        );
    });
  }

  getStudents(sec: number, period: number, date: string) {
    date = formatDate(date, "yyyy-MM-dd", "en");
    this.http
      .get(
        `http://localhost:3000/api/students/hour-present?sec=${sec}&hour=${period}$date=${date}`
      )
      .subscribe((data: any) => {
        this.students = data;
      });
  }

  getTimeTables(sec: number) {
    this.http
      .get(`http://localhost:3000/api/time-tables?sec=${sec}`)
      .subscribe((data: any) => {
        this.timeTables = data;
      });
  }

  getHours(sectionId: number) {}

  submit() {
    console.log(this.form.value);
  }
}
