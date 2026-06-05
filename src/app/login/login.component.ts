import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminLoginService } from '../Services/admin-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   isLogin = true;

  authForm!: FormGroup;

  constructor(

    private router: Router,

    private fb: FormBuilder,

    private authService: AdminLoginService

  ) {

    this.initializeForm();

  }

  // =====================
  // FORM INIT
  // =====================

  initializeForm(): void {

    this.authForm =
      this.fb.group({

        name: [''],

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

  // =====================
  // SUBMIT
  // =====================

  onSubmit(): void {

    if (
      this.authForm.invalid
    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Validation Error',

        text:
          'Please fill all fields'

      });

      return;

    }

    // =====================
    // LOGIN
    // =====================

    if (this.isLogin) {

      const loginData = {

        email:
          this.authForm.value.email,

        password:
          this.authForm.value.password

      };

      this.authService
        .login(
          loginData
        )
        .subscribe({

          next: (
            response: any
          ) => {

            // Token Save

            localStorage.setItem(

              'token',

              response.token

            );

            Swal.fire({

              icon: 'success',

              title: 'Success',

              text:
                'Login Successful'

            });

            this.router.navigate([
              '/admin/dashboard'
            ]);

          },

          error: (
            error
          ) => {

            Swal.fire({

              icon: 'error',

              title: 'Login Failed',

              text:
                error?.error?.message ||
                'Invalid Credentials'

            });

          }

        });

    }

    // =====================
    // REGISTER
    // =====================

    else {

      const registerData = {

        name:
          this.authForm.value.name,

        email:
          this.authForm.value.email,

        password:
          this.authForm.value.password,

        role:
          'ADMIN',

        permissions: [

          'ADD_PRODUCT',

          'DELETE_PRODUCT'

        ]

      };

      this.authService
        .register(
          registerData
        )
        .subscribe({

          next: (
            response: any
          ) => {

            Swal.fire({

              icon: 'success',

              title: 'Success',

              text:
                'Registration Successful'

            });

            this.isLogin =
              true;

            this.authForm.reset();

          },

          error: (
            error
          ) => {

            Swal.fire({

              icon: 'error',

              title:
                'Registration Failed',

              text:
                error?.error?.message ||
                'Something went wrong'

            });

          }

        });

    }

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
