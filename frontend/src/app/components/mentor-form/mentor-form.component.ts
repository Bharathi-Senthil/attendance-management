import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-mentor-form",
  templateUrl: "./mentor-form.component.html",
  styleUrls: ["./mentor-form.component.scss"],
})
export class MentorFormComponent implements OnInit {
  form: FormGroup;

  students: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(8),
        ],
      ],
      studentId: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.http
      .get("http://localhost:3000/api/students?mentor=null")
      .subscribe((students: any) => {
        students.forEach((s: any) => {
          delete s.mentorId;
          delete s.mentorName;
        });
        this.students = students;
      });
  }

  submit() {
    if (this.form.valid) {
      // if (this.studentId === -1)
      this.http
        .post("http://localhost:3000/api/users/register", this.form.value)
        .subscribe((data: any) => {
          this.form.reset();
          // this.onFormSubmit.emit();
        });
      // else
      //   this.http
      //     .put(`http://localhost:3000/api/students/${this.studentId}`, {
      //       id: this.studentId,
      //       ...this.form.value,
      //     })
      //     .subscribe((data: any) => {
      //       this.studentId = -1;
      //       this.form.reset();
      //       this.onFormSubmit.emit();
      //     });
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
