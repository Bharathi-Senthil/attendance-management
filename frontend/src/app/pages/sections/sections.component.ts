import { FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-section",
  templateUrl: "./sections.component.html",
  styleUrls: ["./sections.component.scss"],
})
export class SectionsComponent implements OnInit {
  sections: any[];
  isLoading = false;

  id = -1;
  section = new FormControl("", [Validators.required]);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSection();
  }

  getSection() {
    this.isLoading = true;
    this.http
      .get("http://localhost:3000/api/sections")
      .subscribe((data: any) => {
        this.isLoading = false;
        this.sections = data;
      });
  }

  submit() {
    if (this.section.valid) {
      if (this.id === -1)
        this.http
          .post("http://localhost:3000/api/sections", {
            name: this.section.value,
          })
          .subscribe((data: any) => {
            this.section.reset();
            this.getSection();
          });
      else
        this.http
          .put(`http://localhost:3000/api/sections/${this.id}`, {
            id: this.id,
            name: this.section.value,
          })
          .subscribe((data: any) => {
            this.id = -1;
            this.section.reset();
            this.getSection();
          });
    } else {
      this.section.markAsDirty();
      this.section.updateValueAndValidity({ onlySelf: true });
    }
  }

  delete(id: number) {
    this.http
      .delete(`http://localhost:3000/api/sections/${id}`)
      .subscribe(() => {
        this.getSection();
      });
  }

  edit(id: number, name: string) {
    this.id = id;
    this.section.setValue(name);
  }
}
