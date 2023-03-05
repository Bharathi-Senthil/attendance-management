import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { SlideInOut } from "./../../animations";
import { Component, Input, OnInit } from "@angular/core";
import { Menu, Section } from "../../models";
import { downloadCSV } from "src/app/helpers";

import { environment } from "src/environments/environment";

@Component({
  selector: "app-sider",
  templateUrl: "./sider.component.html",
  styleUrls: ["./sider.component.scss"],
  animations: [SlideInOut],
})
export class SiderComponent implements OnInit {
  @Input()
  menu: Menu[] = [];

  sections: Section[];

  isVisible = false;

  dropdown: { id: any; isOpen: boolean } = {
    id: null,
    isOpen: false,
  };

  section = new FormControl(null, [Validators.required]);
  year = new FormControl(null, [Validators.required]);
  date = new FormControl(null, [Validators.required]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Section[]>(`${environment.apiUrl}/sections`)
      .subscribe((data: Section[]) => {
        this.sections = data;
      });
  }

  toggle(id: any) {
    if (id === this.dropdown.id) this.dropdown.isOpen = !this.dropdown.isOpen;
    else this.dropdown.isOpen = true;
    this.dropdown.id = id;
  }

  changeReportType(type: string) {
    if (type === "day") this.date.enable();
    else this.date.disable();
  }

  getReport() {
    let fDate: any;
    if (this.date.value)
      fDate = formatDate(String(this.date.value), "yyyy-MM-dd", "en");
    this.http
      .get<any>(
        `${environment.apiUrl}/report/day?year=${this.year.value}&sec=${
          this.section.value
        }${fDate ? `&date=${fDate}` : ""}`
      )
      .subscribe((res) => {
        console.log(res);
        if (res.length > 0)
          downloadCSV(res, this.year.value, this.section.value, fDate);
        this.section.reset();
        this.year.reset();
        this.date.reset();
      });
  }
}
