import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm!: FormGroup;

  subBranches: any[] = [];

  selectedPhoto!: File;

  selectedAadhaar!: File;

  photoPreview: string = '';

  aadhaarPreview: string = '';

  constructor(

    private fb: FormBuilder,

    private employeeService:
    EmployeeService,

    private adminService:
    AdminLoginService,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.employeeForm =
      this.fb.group({

        firstName: [

          '',

          Validators.required

        ],

        lastName: [

          '',

          Validators.required

        ],

        contactNumber: [

          '',

          [
            Validators.required,

            Validators.pattern(
              '^[0-9]{10}$'
            )

          ]

        ],

        role: [

          '',

          Validators.required

        ],

        subBranchId: [

          '',

          Validators.required

        ],

        location: [''],

        address: [''],

        status: [

          'ACTIVE'

        ]

      });

    this.getAllSubBranches();

  }

  // ====================
  // GET SUB BRANCHES
  // ====================

  getAllSubBranches() {

    this.adminService
      .getAllSubBranches()
      .subscribe({

        next: (res: any) => {

          this.subBranches =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ====================
  // PHOTO PREVIEW
  // ====================

  onPhotoChange(event: any) {

    if (

      event.target.files &&
      event.target.files[0]

    ) {

      this.selectedPhoto =
        event.target.files[0];

      const reader =
        new FileReader();

      reader.onload = (e: any) => {

        this.photoPreview =
          e.target.result;

      };

      reader.readAsDataURL(

        this.selectedPhoto

      );

    }

  }

  // ====================
  // AADHAAR PREVIEW
  // ====================

  onAadhaarChange(event: any) {

    if (

      event.target.files &&
      event.target.files[0]

    ) {

      this.selectedAadhaar =
        event.target.files[0];

      const reader =
        new FileReader();

      reader.onload = (e: any) => {

        this.aadhaarPreview =
          e.target.result;

      };

      reader.readAsDataURL(

        this.selectedAadhaar

      );

    }

  }

  // ====================
  // CREATE EMPLOYEE
  // ====================

  createEmployee() {

    if (

      this.employeeForm.invalid

    ) {

      this.employeeForm
        .markAllAsTouched();

      return;

    }

    const formData =
      new FormData();

    formData.append(

      'firstName',

      this.employeeForm.value.firstName

    );

    formData.append(

      'lastName',

      this.employeeForm.value.lastName

    );

    formData.append(

      'contactNumber',

      this.employeeForm.value.contactNumber

    );

    formData.append(

      'role',

      this.employeeForm.value.role

    );

    formData.append(

      'subBranchId',

      this.employeeForm.value.subBranchId

    );

    formData.append(

      'location',

      this.employeeForm.value.location

    );

    formData.append(

      'address',

      this.employeeForm.value.address

    );

    formData.append(

      'status',

      this.employeeForm.value.status

    );

    if (

      this.selectedPhoto

    ) {

      formData.append(

        'photo',

        this.selectedPhoto

      );

    }

    if (

      this.selectedAadhaar

    ) {

      formData.append(

        'aadhaarImage',

        this.selectedAadhaar

      );

    }

    this.employeeService
      .createEmployee(
        formData
      )
      .subscribe({

        next: (res: any) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text:
              res.message

          });

          this.employeeForm.reset();

          this.photoPreview = '';

          this.aadhaarPreview = '';

          this.router.navigate([

            '/admin/employee-list'

          ]);

        },

        error: (err) => {

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              err.error.message

          });

        }

      });

  }

  // ====================
  // BACK
  // ====================

  goBack() {

    this.router.navigate([

      '/admin/employee-list'

    ]);

  }

}