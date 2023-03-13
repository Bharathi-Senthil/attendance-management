import { formatDate } from "@angular/common";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js/auto";
import "chartjs-plugin-datalabels";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  @ViewChild("canvas") canvasRef: ElementRef<HTMLCanvasElement>;
  // isLoading: boolean;
  lineChart: any;
  barChart: any;
  doughNut: any;

  _date: Date;
  dateRange: Date[];

  get date() {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
    this.http
      .get(
        `${environment.apiUrl}/report/dashboard?year=2&sec=1&date=${formatDate(
          this.date,
          "yyyy-MM-dd",
          "en"
        )}`
      )
      .subscribe((res: any) => {
        this.doughNut.data.datasets[0].data[0] = res[0].totalAbsent;
        this.doughNut.data.datasets[0].data[1] = res[0].totalPresent;
        this.doughNut.update();
      });
  }

  config: any = {
    data: {
      // values on X-Axis
      labels: [],
      datasets: [
        {
          label: "Present",
          data: [],
          backgroundColor: "#22c55e",
          borderColor: "#22c55e",
        },
        {
          label: "Absent",
          data: [],
          backgroundColor: "#ef4444",
          borderColor: "#ef4444",
        },
      ],
    },
    options: {
      aspectRatio: 2.5,
    },
  };
  constructor(private http: HttpClient) {
    // this.isLoading = true;

    Chart.register(
      BarElement,
      BarController,
      CategoryScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    );
  }

  ngOnInit(): void {
    this.date = new Date();

    let addedDate = new Date();
    addedDate.setDate(new Date().getDate() + 4);
    this.dateRange = [new Date(), addedDate];

    this.doughNut = new Chart("doughnut", {
      type: "doughnut",
      data: {
        labels: ["Absent", "Present"],
        datasets: [
          {
            label: "Student",
            data: [0, 0],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 4,
          },
        ],
      },
    });
    this.lineChart = new Chart("lineChart", {
      type: "line",
      ...this.config,
    });

    this.barChart = new Chart("barChart", {
      type: "bar",
      ...this.config,
    });
    this.generateChart([this.dateRange[0], this.dateRange[1]]);
  }

  generateChart(date: Date[]) {
    let startDate = formatDate(date[0], "yyyy-MM-dd", "en");
    let endDate = formatDate(date[1], "yyyy-MM-dd", "en");
    this.config.data.labels = [];
    this.config.data.datasets[0].data = [];
    this.config.data.datasets[1].data = [];
    this.http
      .get(
        `${environment.apiUrl}/report/dashboard/range?year=2&sec=1&startDate=${startDate}&endDate=${endDate}`
      )
      .subscribe((res: any) => {
        res.forEach((data: any) => {
          this.config.data.labels.push(data.date);
          this.config.data.datasets[0].data.push(
            data.totalStudent - data.totalAbsent
          );
          this.config.data.datasets[1].data.push(data.totalAbsent);
        });
        this.lineChart.update();
        this.barChart.update();
      });
  }
}
