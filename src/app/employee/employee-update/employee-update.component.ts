import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employeeForm!: FormGroup;

  employeeId!: string;

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

    private route:
    ActivatedRoute,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.employeeId =
      this.route.snapshot.params['id'];

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
          Validators.required
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

    this.getEmployeeById();

  }

  // ===================
  // GET SUB BRANCHES
  // ===================

  getAllSubBranches() {

    this.adminService
      .getAllSubBranches()
      .subscribe({

        next: (res: any) => {

          this.subBranches =
            res.data;

        }

      });

  }

  // ===================
  // GET EMPLOYEE BY ID
  // ===================

  getEmployeeById() {

    this.employeeService
      .getEmployeeById(
        this.employeeId
      )
      .subscribe({

        next: (res: any) => {

          const data =
            res.data;

          this.employeeForm
            .patchValue({

              firstName:
                data.firstName,

              lastName:
                data.lastName,

              contactNumber:
                data.contactNumber,

              role:
                data.role,

              subBranchId:
                data.subBranchId?._id ||
                data.subBranchId,

              location:
                data.location,

              address:
                data.address,

              status:
                data.status

            });

          this.photoPreview =
            data.photo;

          this.aadhaarPreview =
            data.aadhaarImage;

        }

      });

  }

  // ===================
  // PHOTO CHANGE
  // ===================

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

  // ===================
  // AADHAAR CHANGE
  // ===================

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

  // ===================
  // UPDATE EMPLOYEE
  // ===================

  updateEmployee() {

    if (
      this.employeeForm.invalid
    ) {

      this.employeeForm
        .markAllAsTouched();

      return;

    }

    const formData =
      new FormData();

    Object.keys(
      this.employeeForm.value
    ).forEach(key => {

      formData.append(

        key,

        this.employeeForm.value[key]

      );

    });

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
      .updateEmployee(

        this.employeeId,

        formData

      )
      .subscribe({

        next: (res: any) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text:
              res.message ||

              'Employee Updated Successfully'

          });

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

  // ===================
  // BACK
  // ===================

  goBack() {

    this.router.navigate([

      '/admin/employee-list'

    ]);

  }

}
