import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AlertService } from 'src/app/Services/alert.service';
import { OrderService } from 'src/app/Services/order.service';
import { ViewOrdersComponent } from 'src/app/View-dialog-Controllers/view-orders/view-orders.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  displayedColumns: string[] = [

    'sno',

    'orderNumber',

    'customer',

    'phone',

    'orderSource',
    'subBranch',

    'payment',

    'status',

    'amount',

    'date',

    'actions'

  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(

    private orderService: OrderService,

    private router: Router,
     private alert: AlertService,

    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.getOrders();

  }

  // ===========================
  // GET ALL ORDERS
  // ===========================

  getOrders(): void {

    this.orderService.getAllOrders().subscribe({

      next: (res: any) => {

        this.dataSource.data = res.data;

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  // ===========================
  // SEARCH
  // ===========================

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement)
      .value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterValue;

  }

  // ===========================
  // VIEW
  // ===========================

  viewOrder(order: any): void {

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

  // ===========================
  // EDIT
  // ===========================

  editOrder(id: string): void {

    this.router.navigate([

      '/admin/order/edit',

      id

    ]);

  }

  // ===========================
  // DELETE
  // ===========================

  deleteCategory(id: string): void {

  const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      this.orderService.deleteOrder(id).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'Order Deleted Successfully',
            timer: 2500,
            showConfirmButton: false
          });

          this.getOrders();

        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Delete Failed'
          });

        }

      });

    }

  });

}


}