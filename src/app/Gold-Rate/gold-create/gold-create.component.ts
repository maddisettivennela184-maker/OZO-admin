import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoldRateService } from 'src/app/Services/gold-rate.service';

@Component({
  selector: 'app-gold-create',
  templateUrl: './gold-create.component.html',
  styleUrls: ['./gold-create.component.css']
})
export class GoldCreateComponent {
goldRateForm!:
    FormGroup;

  constructor(
    private fb:
      FormBuilder,

    private goldRateService:
      GoldRateService,

    private router:
      Router
  ) {

    this.goldRateForm =
      this.fb.group({

        ratePerGram: [
          '',
          Validators.required
        ],

        updatedBy: [
          '',
          Validators.required
        ]

      });
  }

  /*
  SUBMIT
  */
  onSubmit(): void {

    if (
      this.goldRateForm.valid
    ) {

      this.goldRateService
        .createGoldRate(
          this.goldRateForm.value
        )
        .subscribe({

          next: (
            response
          ) => {

            alert(
              "Gold Rate Created Successfully"
            );

            this.router.navigate([
              '/admin/gold-rate'
            ]);
          },

          error: (
            error
          ) => {
            console.error(
              error
            );
          }

        });
    }
  }

  /*
  BACK
  */
  goBack(): void {
    this.router.navigate([
      '/admin/gold-rate'
    ]);
  }
}
