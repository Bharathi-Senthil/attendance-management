import { Component } from '@angular/core';
import { Menu } from 'src/app/Models';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menu: Menu[] = [
    {
      title: 'Fill Attendance',
      icon: 'checkBox',
    },
    {
      title: 'Dashboard',
      icon: 'team',
    },
  ];
}
