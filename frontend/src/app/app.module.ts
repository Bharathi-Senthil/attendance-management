import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiderComponent } from './components/sider/sider.component';
import { AttendanceFromComponent } from './components/attendance-from/attendance-from.component';

@NgModule({
  declarations: [
    AppComponent,
    SiderComponent,
    AttendanceFromComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
