import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { ViewOrdersComponent } from 'src/app/View-dialog-Controllers/view-orders/view-orders.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orders: any[] = [];

  filteredOrders: any[] = [];

  searchText: string = '';


  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog
   
  ) { }

  ngOnInit(): void {
    

    this.getOrders();

  }

  getOrders(): void {

    this.orderService
      .getAllOrders()
      .subscribe({

        next: (res: any) => {

          this.orders = res.data;

          this.filteredOrders = res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  searchOrder(event: any) {

  const value =
    event.target.value.toLowerCase();

  this.filteredOrders =
    this.orders.filter(order =>
      order.orderNumber
        ?.toLowerCase()
        .includes(value)
    );

}

 

viewOrder(order: any): void {
    console.log('ORDER =>', order);

  this.dialog.open(
    ViewOrdersComponent,
    {
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: order,
      autoFocus: false
    }
  );

}

  editOrder(id: string): void {

    this.router.navigate([
      '/admin/order/edit',
      id
    ]);

  }

  deleteOrder(id: string): void {

    if (
      confirm(
        'Are you sure want to delete this order?'
      )
    ) {

      this.orderService
        .deleteOrder(id)
        .subscribe({

          next: () => {

            this.getOrders();

          },

          error: (err) => {

            console.log(err);

          }

        });

    }

  }

}
