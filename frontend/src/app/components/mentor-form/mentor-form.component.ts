import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Student } from "src/app/models";

@Component({
  selector: "app-mentor-form",
  templateUrl: "./mentor-form.component.html",
  styleUrls: ["./mentor-form.component.scss"],
})
export class MentorFormComponent implements OnInit {
  form: FormGroup;

  _mentorId = -1;

  get mentorId() {
    return this._mentorId;
  }

  @Input()
  set mentorId(id: number) {
    this._mentorId = id;
    this.mentorIdChange.emit(id);
    if (id > 0) {
      this.form.controls["password"].disable();
      this.http
        .get(`http://localhost:3000/api/users/${id}`)
        .subscribe((user: any) => {
          this.getStudents(user.id);
          this.form.patchValue(user);
        });
    } else this.form.controls["password"].enable();
  }

  @Output()
  mentorIdChange = new EventEmitter();

  @Output()
  onFormSubmit = new EventEmitter();

  students: Student[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.minLength(8),
        ],
      ],
      studentId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(mentorId?: number) {
    this.http
      .get(
        `http://localhost:3000/api/students?mentor=${
          mentorId ? mentorId : null
        }`
      )
      .subscribe((students: any) => {
        if (!mentorId) this.students = students;
        else {
          this.students = [...this.students, ...students];
          let studentId: any[] = [];
          students.forEach((s: any) => {
            studentId.push(s.id);
          });
          this.form.controls["studentId"].setValue(studentId);
        }
      });
  }

  submit() {
    if (this.form.valid) {
      if (this.mentorId === -1)
        this.http
          .post("http://localhost:3000/api/users/register", this.form.value)
          .subscribe((data: any) => {
            this.getStudents(this.mentorId);
            this.form.reset();
            this.onFormSubmit.emit();
          });
      else
        this.http
          .put(`http://localhost:3000/api/users/${this.mentorId}`, {
            id: this.mentorId,
            ...this.form.value,
          })
          .subscribe((data: any) => {
            this.mentorId = -1;
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
