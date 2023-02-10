import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { FormSectionComponent } from './Component/form-section/form-section.component';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormGroup } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FormSectionComponent
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
