import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormSectionComponent } from './Component/form-section/form-section.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';

const routes: Routes = [

  {
    path: 'addAttendance',
    component:FormSectionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
