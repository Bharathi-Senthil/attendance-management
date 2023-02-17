import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/helpers/data.service";
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "day-attendance-form",
  templateUrl: "./day-attendance-form.component.html",
  styleUrls: ["./day-attendance-form.component.scss"],
})
export class DayAttendanceFormComponent implements OnInit {
  form: FormGroup;
  students: any = [];

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: null,
      department: [{ value: "CSe", disabled: true }, [Validators.required]],
      student: [null, [Validators.required]],
      section: [null, [Validators.required]],
      absent: [true, [Validators.required]],
      date: [{ value: new Date(), disabled: true }, [Validators.required]],
    });

    this.data.getDate().subscribe((date) => {
      this.form.controls["date"].setValue(date);
    });
  }

  submit() {
    if (this.form.valid && this.form.controls["sutdent"].value.length > 0) {
      let data = this.form.getRawValue();
      data.date = formatDate(data.date, "yyyy-MM-dd", "en");
      this.http
        .post(`http://localhost:3000/api/day-attendance`, data)
        .subscribe((data) => {
          this.form.controls["section"].reset();
          this.form.controls["student"].reset();
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
