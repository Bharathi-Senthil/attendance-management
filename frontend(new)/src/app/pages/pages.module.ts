import { RouterModule } from '@angular/router';
// import { ComponentsModule } from './../components/components.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
// import { PagesRoutingModule } from './pages.routing.module';



@NgModule({
    declarations: [BaseLayoutComponent,],
    imports: [
      CommonModule,
      ComponentsModule,
      PagesRoutingModule,
      RouterModule,
     
    ],
  })
  export class PagesModule {}