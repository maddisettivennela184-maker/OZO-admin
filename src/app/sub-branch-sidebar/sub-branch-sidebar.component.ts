import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-branch-sidebar',
  templateUrl: './sub-branch-sidebar.component.html',
  styleUrls: ['./sub-branch-sidebar.component.css'],
})
export class SubBranchSidebarComponent {
showProfilePopup = false;

role = localStorage.getItem('role') || '';


  isSidebarClosed = false;
 showDropdown = false;
  userName = localStorage.getItem('name') || 'Admin';
userEmail = localStorage.getItem('email') || 'email@gmail.com';

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
  toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

  onMouseEnter() {}

  onMouseLeave() {}
 goToProfile(){

  this.showDropdown = false;

  // this.router.navigate(['SUB_BRANCH/Profile']);
   this.showProfilePopup = true;

}
logout() {

  this.showDropdown = false;

  Swal.fire({

    title:'Confirm Logout?',

    icon:'question',

    iconColor:'#640101',

    confirmButtonColor:'#640101',

    showCancelButton:true,

    confirmButtonText:'Logout',

    cancelButtonText:'Cancel'

  }).then((result:any)=>{

    if(result.isConfirmed){

      localStorage.clear();

      this.router.navigate(['/login']);

    }

  });

}

 

closeProfile() {

  this.showProfilePopup = false;

}


}