import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  config = {
    data: {
      // values on X-Axis
      labels: [
        "2022-05-10",
        "2022-05-11",
        "2022-05-12",
        "2022-05-13",
        "2022-05-14",
        "2022-05-15",
        "2022-05-16",
        "2022-05-17",
      ],
      datasets: [
        {
          label: "Present",
          data: ["467", "576", "572", "79", "92", "574", "573", "576"],
          backgroundColor: "#22c55e",
          borderColor: "#22c55e",
        },
        {
          label: "Absent",
          data: ["542", "542", "536", "327", "17", "0.00", "538", "541"],
          backgroundColor: "#ef4444",
          borderColor: "#ef4444",
        },
      ],
    },
    options: {
      aspectRatio: 2.5,
    },
  };
  constructor() {
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
    new Chart("lineChart", {
      type: "line", //this denotes tha type of chart
      ...this.config,
    });

    new Chart("barChart", {
      type: "bar", //this denotes tha type of chart
      ...this.config,
    });

    new Chart("doughnut", {
      type: "doughnut", //this denotes tha type of chart
      data: {
        labels: ["Present", "Absent", "OD"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
}
