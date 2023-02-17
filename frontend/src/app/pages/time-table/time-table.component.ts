import { FadeInOut } from "./../../animations";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-time-table",
  templateUrl: "./time-table.component.html",
  styleUrls: ["./time-table.component.scss"],
  animations: [FadeInOut],
})
export class TimeTableComponent implements OnInit {
  timeTables: any[];
  isLoading = false;

  timeTableId = -1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTimeTable();
  }

  getTimeTable() {
    this.http
      .get("http://localhost:3000/api/time-tables")
      .subscribe((data: any) => {
        this.timeTables = data;
      });
  }

  deleteTimeTable(id: number) {
    this.http
      .delete(`http://localhost:3000/api/time-tables/${id}`)
      .subscribe((data: any) => this.getTimeTable());
  }
}
