import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sider/sider.component';
import { AttendanceFromComponent } from './components/attendance-from/attendance-from.component';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormGroup } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AttendanceFromComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
