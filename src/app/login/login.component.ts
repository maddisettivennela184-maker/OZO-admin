import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminLoginService } from '../Services/admin-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role: string = '';
  selectedRole = '';
  showPassword = false;

   isLogin = true;

  authForm!: FormGroup;

  constructor(

    private router: Router,

    private fb: FormBuilder,

    private authService: AdminLoginService

  ) {

    this.initializeForm();

  }
  ngOnInit(): void {
    this.role =
    localStorage.getItem('role') || '';

  console.log(
    'ROLE =>',
    this.role
  );
  }

  // =====================
  // FORM INIT
  // =====================

  initializeForm(): void {

    this.authForm =
      this.fb.group({

        name: [''],
 role: [''],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          Validators.required
        ]

      });

  }

  // =====================
  // LOGIN / REGISTER TOGGLE
  // =====================

  signupForm(): void {

    this.isLogin =
      !this.isLogin;

    if (this.isLogin) {

      this.authForm
        .get('name')
        ?.clearValidators();

    }

    else {

      this.authForm
        .get('name')
        ?.setValidators(
          Validators.required
        );

    }

    this.authForm
      .get('name')
      ?.updateValueAndValidity();

  }
  togglePassword() {

  this.showPassword =
    !this.showPassword;

}

  // =====================
  // SUBMIT
  // =====================

onSubmit() {

  if (!this.selectedRole) {

    Swal.fire(
      'Error',
      'Please Select Role',
      'error'
    );

    return;
  }

  const loginData = {

    email: this.authForm.value.email,

    password: this.authForm.value.password

  };

  this.authService.login(loginData)
    .subscribe({

      next: (res: any) => {

        console.log(res);

        // Role Validation

        if (
          this.selectedRole !==
          res.role
        ) {

          Swal.fire(
            'Error',
            'Selected Role Not Matched',
            'error'
          );

          return;

        }

        localStorage.setItem(
          'token',
          res.token
        );

        localStorage.setItem(
          'role',
          res.role
        );
         // 👇 IKKADA ADD CHEYYI
  localStorage.setItem(
    'name',
    res.name
  );

  localStorage.setItem(
    'email',
    res.email
  );
  localStorage.setItem(
  'adminId',
  res._id
);

        // Branch Login

        if (
          res.role === 'BRANCH'
        ) {

          this.router.navigate([
            '/admin/dashboard'
          ]);

        }

        // Sub Branch Login

        else if (
          res.role === 'SUB_BRANCH'
        ) {

          this.router.navigate([
            '/SUB_BRANCH/dashboard'
          ]);

        }

      },
      // 👇 ADD THIS BLOCK
    error: (err) => {

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.error?.message || 'Something went wrong',
        confirmButtonColor: '#640101'
      });

    }

    });

}

  // =====================
  // FORGOT PASSWORD
  // =====================

  forgotPassword(): void {

    const email =
      this.authForm.value.email;

    if (!email) {

      Swal.fire({

        icon: 'warning',

        title: 'Email Required',

        text:
          'Please enter your email'

      });

      return;

    }

    this.authService
      .forgotPassword(
        email
      )
      .subscribe({

        next: (
          response: any
        ) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text:
              response.message ||
              'Reset link sent successfully'

          });

        },

        error: (
          error
        ) => {

          Swal.fire({

            icon: 'error',

            title: 'Failed',

            text:
              error?.error?.message ||
              'Something went wrong'

          });

        }

      });

  }

}
