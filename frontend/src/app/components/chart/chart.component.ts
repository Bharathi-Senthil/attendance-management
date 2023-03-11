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
            backgroundColor: "limegreen",
            borderColor: "limegreen",
          },
          {
            label: "Absent",
            data: ["542", "542", "536", "327", "17", "0.00", "538", "541"],
            backgroundColor: "red",
            borderColor: "red",
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });

    new Chart("barchart", {
      type: "bar", //this denotes tha type of chart

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
            backgroundColor: "limegreen",
            borderColor: "limegreen",
          },
          {
            label: "Absent",
            data: ["542", "542", "536", "327", "17", "0.00", "538", "541"],
            backgroundColor: "red",
            borderColor: "red",
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
