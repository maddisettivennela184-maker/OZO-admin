import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // showDropdown = false;
showProfilePopup = false;

userName = localStorage.getItem('name') || 'Admin';
userEmail = localStorage.getItem('email') || 'admin@gmail.com';
role = localStorage.getItem('role') || '';
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



  // logout() {
  //   localStorage.removeItem('admin');
  //   this.router.navigate(['/login']);
  // }

  toggleMenu(menu: string) {

    if (this.openMenu === menu) {

      this.openMenu = '';

    } else {

      this.openMenu = menu;

    }

  }

// ====logout=====
toggleDropdown() {

  this.showDropdown = !this.showDropdown;

}

goToProfile() {

  this.showDropdown = false;

  this.showProfilePopup = true;

}

closeProfile() {

  this.showProfilePopup = false;

}

logout() {

  this.showDropdown = false;

  Swal.fire({

    title: 'Confirm Logout?',

    icon: 'question',

    iconColor: '#640101',

    confirmButtonColor: '#640101',

    showCancelButton: true,

    confirmButtonText: 'Logout',

    cancelButtonText: 'Cancel'

  }).then((result: any) => {

    if (result.isConfirmed) {

      localStorage.clear();

      this.router.navigate(['/login']);

    }

  });

}
}
