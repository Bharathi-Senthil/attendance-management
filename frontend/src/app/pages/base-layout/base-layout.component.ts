import { navigationAnimation } from "./../../animations";
import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.scss"],
  animations: [navigationAnimation],
})
export class BaseLayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animationState"]
    );
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
