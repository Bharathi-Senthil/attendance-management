import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-subject-section-hours",
  templateUrl: "./subject-section-hours.component.html",
  styleUrls: ["./subject-section-hours.component.scss"],
})
export class SubjectSectionHoursComponent implements OnInit {
  hours: any[];

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form;
  }
  ngOnInit(): void {
    this.getSubjectHours();
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
}
