import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.scss"],
})
export class BaseLayoutComponent {
  constructor(private router: Router) {}
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
