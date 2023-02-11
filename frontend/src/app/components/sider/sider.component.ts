import { Component } from '@angular/core';
import { Menu } from 'src/app/Models/menu.module';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
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