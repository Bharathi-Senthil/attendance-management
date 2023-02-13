import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-time-table-form",
  templateUrl: "./time-table-form.component.html",
  styleUrls: ["./time-table-form.component.scss"],
})
export class TimeTableFormComponent implements OnInit {
  form: FormGroup;
  sections: any[];
  subjects: any[];

  _timeTableId = -1;

  @Input()
  timeTables: any[];

  @Input()
  days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  get timeTableId() {
    return this._timeTableId;
  }

  @Input()
  set timeTableId(id: number) {
    this._timeTableId = id;
    // this.timeTableIdChange.emit(id);
    if (id > 0)
      this.http
        .get(`http://localhost:3000/api/time-tables/${id}`)
        .subscribe((data: any) => {
          this.form.patchValue(data);
          this.getDay(data.sectionId);
          this.form.controls["sectionId"].disable();
        });
  }

  @Output()
  timeTableIdChange = new EventEmitter();

  @Output()
  onFormSubmit = new EventEmitter();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      day: [null, [Validators.required]],
      sectionId: [null, [Validators.required]],
      period1SubjectId: [null, [Validators.required]],
      period2SubjectId: [null, [Validators.required]],
      period3SubjectId: [null, [Validators.required]],
      period4SubjectId: [null, [Validators.required]],
      period5SubjectId: [null, [Validators.required]],
      period6SubjectId: [null, [Validators.required]],
      period7SubjectId: [null, [Validators.required]],
      period8SubjectId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.http
      .get(`http://localhost:3000/api/sections`)
      .subscribe((data: any) => {
        this.sections = data;
      });
    this.http
      .get(`http://localhost:3000/api/subjects`)
      .subscribe((data: any) => {
        this.subjects = data;
      });
  }

  getDay(secId: number) {
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let secTT = this.timeTables.filter((tt) => tt.sectionId === secId);
    secTT.forEach((sTT) => (this.days = this.days.filter((d) => d != sTT.day)));
    let selectedDay = this.form.controls["day"].value;
    if (selectedDay && !this.days.includes(selectedDay))
      this.days.push(selectedDay);
  }
  submit() {
    if (this.form.valid) {
      console.log(this.timeTableId);
      if (this.timeTableId === -1)
        this.http
          .post("http://localhost:3000/api/time-tables", this.form.value)
          .subscribe((data: any) => {
            this.form.reset();
            this.onFormSubmit.emit();
          });
      else
        this.http
          .put(`http://localhost:3000/api/time-tables/${this.timeTableId}`, {
            id: this.timeTableId,
            ...this.form.value,
          })
          .subscribe((data: any) => {
            this.timeTableId = -1;
            this.form.reset();
            this.onFormSubmit.emit();
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
