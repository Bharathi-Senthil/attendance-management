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
      title: "Add Attendance",
      icon: "team",
      path: "attendance",
    },
    {
      title: "Dashboard",
      icon: "pie-chart",
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
