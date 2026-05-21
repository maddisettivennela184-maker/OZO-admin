import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLogin = true;

  constructor(private router: Router) {}
toggleForm() {
    this.isLogin = !this.isLogin;
  }

onSubmit() {
  console.log('clicked');
  this.router.navigate(['admin/dashboard']);
}

  signupForm() {
    this.isLogin = !this.isLogin;
  }
}
