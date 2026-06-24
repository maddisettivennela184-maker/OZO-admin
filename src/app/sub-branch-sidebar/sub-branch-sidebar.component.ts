import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sub-branch-sidebar',
  templateUrl: './sub-branch-sidebar.component.html',
  styleUrls: ['./sub-branch-sidebar.component.css'],
})
export class SubBranchSidebarComponent {
  isSidebarClosed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  onMouseEnter() {}

  onMouseLeave() {}

  logout() {

    localStorage.clear();

    this.router.navigate(['/']);

  }




}