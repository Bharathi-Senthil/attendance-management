import { ComponentsModule } from "./../components/components.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BaseLayoutComponent } from "./base-layout/base-layout.component";
import { PagesRoutingModule } from "./pages.routing.module";

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [CommonModule, PagesRoutingModule, RouterModule, ComponentsModule],
})
@NgModule({
    declarations: [BaseLayoutComponent,],
    imports: [
      CommonModule,
      PagesRoutingModule,
      RouterModule,
      
    ],
  })
  export class PagesModule {}

