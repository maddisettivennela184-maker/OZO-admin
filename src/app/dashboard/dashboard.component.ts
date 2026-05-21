import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  openMenu: string = 'catalog';

  isSidebarClosed = false;
  isManuallyToggled = false;
  showDropdown: boolean = false;

  constructor(private router: Router) { }


  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.isManuallyToggled = !this.isManuallyToggled;
  }

  onMouseEnter() {
    if (this.isSidebarClosed && this.isManuallyToggled) {
      this.isSidebarClosed = false;
    }
  }

  onMouseLeave() {
    if (!this.isSidebarClosed && this.isManuallyToggled) {
      this.isSidebarClosed = true;
    }
  }



  logout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }

  toggleMenu(menu: string) {

    if (this.openMenu === menu) {

      this.openMenu = '';

    } else {

      this.openMenu = menu;

    }

  }
}
