  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

  @Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.css']
  })
  export class CreateOrderComponent implements OnInit {

  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.orderForm = this.fb.group({

      user: ['', Validators.required],

      address: ['', Validators.required],

      paymentMethod: ['COD', Validators.required],

      subTotal: [0],

      discountAmount: [0],

      shippingCharge: [0],

      gstAmount: [0],

      totalAmount: [0],

      notes: [''],

      items: this.fb.array([])

    });

    this.addItem();

  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(): void {

    this.items.push(

      this.fb.group({

        product: ['', Validators.required],

        variant: ['', Validators.required],

        quantity: [1, Validators.required],

        unitPrice: [0, Validators.required],

        totalPrice: [0, Validators.required]

      })

    );

  }

  removeItem(index: number): void {

    this.items.removeAt(index);

  }

  onSubmit(): void {

    if (this.orderForm.invalid) {

      this.orderForm.markAllAsTouched();

      return;

    }

    console.log(this.orderForm.value);

  }

}