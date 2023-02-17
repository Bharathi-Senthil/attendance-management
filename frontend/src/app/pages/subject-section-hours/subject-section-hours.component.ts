import { FadeInOut } from "../../animations";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Section, TotalHours } from "src/app/models";

@Component({
  selector: "app-subject-section-hours",
  templateUrl: "./subject-section-hours.component.html",
  styleUrls: ["./subject-section-hours.component.scss"],
  animations: [FadeInOut],
})
export class SubjectSectionHoursComponent implements OnInit {
  hours: TotalHours[];
  isLoading = false;

  tempSubjects: any[];
  subjects: any[];

  sections: any[];

  form: FormGroup;

  _hourId = -1;

  get hourId() {
    return this._hourId;
  }

  set hourId(id: number) {
    this._hourId = id;
    if (id > 0)
      this.http
        .get<TotalHours>(
          `http://localhost:3000/api/subject-section-hours/${id}`
        )
        .subscribe((data: TotalHours) => {
          this.form.patchValue(data);
          let selectedSubject = {
            id: data.subjectId,
            name: data.subjectName,
            code: data.subjectCode,
          };
          if (!this.subjects.includes(selectedSubject)) {
            this.subjects.push(selectedSubject);
          }
        });
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      subjectId: [null, Validators.required],
      sectionId: [null, Validators.required],
      totalHours: [1, Validators.required],
    });
    this.form.controls["sectionId"].valueChanges.subscribe((sectionId) => {
      if (sectionId) {
        this.form.controls["subjectId"].reset();
        this.getSubjects(sectionId);
      }
    });
  }
  ngOnInit(): void {
    0;
    this.getSubjectHours();
    this.http
      .get<TotalHours[]>("http://localhost:3000/api/subjects")
      .subscribe((data: TotalHours[]) => {
        this.subjects = data;
        this.tempSubjects = data;
      });
    this.http
      .get<Section[]>("http://localhost:3000/api/sections")
      .subscribe((data: Section[]) => {
        this.sections = data;
      });
  }

  getSubjectHours() {
    this.isLoading = !this.isLoading;
    this.http
      .get<TotalHours[]>("http://localhost:3000/api/subject-section-hours")
      .subscribe(
        (data: TotalHours[]) => {
          this.isLoading = !this.isLoading;
          this.hours = data;
        },
        (err) => (this.isLoading = !this.isLoading)
      );
  }

  deleteSubjectHours(id: number) {
    this.http
      .delete(`http://localhost:3000/api/subject-section-hours/${id}`)
      .subscribe((data: any) => {
        this.getSubjectHours();
      });
  }

  submit() {
    if (this.form.valid) {
      if (this.hourId < 0)
        this.http
          .post(
            "http://localhost:3000/api/subject-section-hours",
            this.form.value
          )
          .subscribe((data: any) => {
            this.getSubjectHours();
            this.form.reset();
          });
      else
        this.http
          .put(
            `http://localhost:3000/api/subject-section-hours/${this.hourId}`,
            this.form.value
          )
          .subscribe((data: any) => {
            this.getSubjectHours();
            this.form.reset();
            this.hourId = -1;
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
  getSubjects(sectionId: number) {
    this.subjects = this.tempSubjects;
    let sectionHours = this.hours.filter((e) => e.sectionId === sectionId);
    sectionHours.forEach((sh) => {
      this.subjects = this.subjects.filter((s) => sh.subjectId != s.id);
    });
  }
}
