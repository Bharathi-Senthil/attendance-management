import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-subject-section-hours",
  templateUrl: "./subject-section-hours.component.html",
  styleUrls: ["./subject-section-hours.component.scss"],
})
export class SubjectSectionHoursComponent implements OnInit {
  hours: any[];
  subjects: any[];
  sections: any[];
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      subjectId: ["", Validators.required],
      sectionId: ["", Validators.required],
      totalHours: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.getSubjectHours();
    this.http
      .get("http://localhost:3000/api/subjects")
      .subscribe((data: any) => {
        this.subjects = data;
      });
    this.http
      .get("http://localhost:3000/api/sections")
      .subscribe((data: any) => {
        this.sections = data;
      });
  }

  getSubjectHours() {
    this.http
      .get("http://localhost:3000/api/subject-section-hours")
      .subscribe((data: any) => {
        this.hours = data;
      });
  }

  deleteSubjectHours(id: number) {
    this.http
      .delete(`http://localhost:3000/api/subject-section-hours/${id}`)
      .subscribe((data: any) => {
        this.getSubjectHours();
      });
  }

  addSubjectHours() {
    console.log(this.form.value);
    this.http
      .post("http://localhost:3000/api/subject-section-hours", this.form.value)
      .subscribe((data: any) => {
        this.getSubjectHours();
        this.form.reset();
      });
  }
}
