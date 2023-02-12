import { SlideInOut } from "./../../animations";
import { Component } from "@angular/core";
import { Menu } from "../../models";

@Component({
  selector: "app-sider",
  templateUrl: "./sider.component.html",
  styleUrls: ["./sider.component.scss"],
  animations: [SlideInOut],
})
export class SiderComponent {
  menu: Menu[] = [
    {
      title: "Day Attendance",
      icon: "team",
      path: "day-attendance",
    },
    {
      title: "Hourly Attendance",
      icon: "team",
      path: "hourly-attendance",
    },
    {
      title: "Dashboard",
      icon: "pie-chart",
      path: "dashboard",
    },
    {
      title: "Students",
      icon: "user",
      path: "students",
    },
    {
      title: "Section",
      icon: "pie-chart",
      path: "sections",
    },
    {
      title: "Subject",
      icon: "pie-chart",
      path: "subjects",
    },
    {
      title: "Time Table",
      icon: "pie-chart",
      path: "time-tables",
    },
    {
      title: "Total Hours",
      icon: "user",
      path: "total-hours",
    },
  ];

  dropdown: { id: any; isOpen: boolean } = {
    id: null,
    isOpen: false,
  };

  toggle(id: any) {
    if (id === this.dropdown.id) this.dropdown.isOpen = !this.dropdown.isOpen;
    else this.dropdown.isOpen = true;
    this.dropdown.id = id;
  }
}
