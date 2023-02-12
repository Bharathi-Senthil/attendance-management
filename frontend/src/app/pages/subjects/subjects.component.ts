import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-subject",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent {
  sections: any[];
  isLoading = false;

  id = -1;
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      code: ["", [Validators.required]],
      name: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.getSection();
  }

  getSection() {
    this.isLoading = true;
    this.http
      .get("http://localhost:3000/api/subjects")
      .subscribe((data: any) => {
        this.isLoading = false;
        this.sections = data;
      });
  }

  submit() {
    if (this.form.valid) {
      if (this.id === -1)
        this.http
          .post("http://localhost:3000/api/subjects", this.form.value)
          .subscribe((data: any) => {
            this.form.reset();
            this.getSection();
          });
      else
        this.http
          .put(`http://localhost:3000/api/subjects/${this.id}`, {
            id: this.id,
            ...this.form.value,
          })
          .subscribe((data: any) => {
            this.id = -1;
            this.form.reset();
            this.getSection();
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

  delete(id: number) {
    this.http
      .delete(`http://localhost:3000/api/subjects/${id}`)
      .subscribe(() => {
        this.getSection();
      });
  }

  edit(id: number, name: string, code: string) {
    this.id = id;
    this.form.setValue({ name, code });
  }
}
