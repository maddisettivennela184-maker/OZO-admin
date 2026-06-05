import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/Services/product.service';
import { ViewProductComponent } from 'src/app/View-dialog-Controllers/view-product/view-product.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // =====================================
  // TABLE COLUMNS
  // =====================================

  displayedColumns: string[] = [

    'sno',

    'image',

    'name',

    'category',

    'productType',

    // 'price',

    'status',

    'actions'

  ];

  // =====================================
  // DATASOURCE
  // =====================================

  dataSource =
    new MatTableDataSource<any>();

  // =====================================
  // PRODUCTS
  // =====================================

  products: any[] = [];

  // =====================================
  // SELECTED PRODUCT
  // =====================================

  selectedProduct: any = null;

  // =====================================
  // PAGINATOR
  // =====================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // =====================================
  // SORT
  // =====================================

  @ViewChild(MatSort)
  sort!: MatSort;


  // =====================================
  // CONSTRUCTOR
  // =====================================

  constructor(

    private productService:
      ProductService,

    private router:
      Router,
    private dialog:
      MatDialog

  ) { }

  // =====================================
  // ON INIT
  // =====================================

  ngOnInit(): void {

    this.getProducts();

  }

  // =====================================
  // GET PRODUCTS
  // =====================================

  getProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.products =
            res.data;

          this.dataSource =
            new MatTableDataSource(
              this.products
            );

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =====================================
  // SEARCH FILTER
  // =====================================

  applyFilter(
    event: Event
  ): void {

    const filterValue =

      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();

  }

  // =====================================
  // VIEW PRODUCT
  // =====================================

  viewProduct(
    product: Product
  ): void {

    this.dialog.open(

      ViewProductComponent,

      {

        width: '1000px',

        maxHeight: '90vh',

        data: product

      }

    );

  }

  // =====================================
  // EDIT PRODUCT
  // =====================================

  editProduct(
    product: any
  ): void {

    this.router.navigate([

      '/admin/edit-product',

      product._id

    ]);

  }
  // =====================================
  // DELETE PRODUCT
  // =====================================

  deleteProduct(
    product: any
  ): void {

    const dialogRef =
      this.dialog.open(

        DeleteConfirmationComponent,

        {
          width: '400px'
        }

      );

    dialogRef
      .afterClosed()
      .subscribe((result) => {

        // IF DELETE CONFIRMED

        if (result) {

          this.productService
            .deleteProduct(
              product._id
            )
            .subscribe({

              // SUCCESS

              next: () => {

                Swal.fire({

                  icon: 'success',

                  title: 'Deleted',

                  text:
                    'Product Deleted Successfully',

                  timer: 2000,

                  showConfirmButton:
                    false

                });

                this.getProducts();

              },

              // ERROR

              error: (err) => {

                console.log(err);

                Swal.fire({

                  icon: 'error',

                  title: 'Oops...',

                  text:
                    'Delete Failed'

                });

              }

            });

        }

      });

  }
  // =====================================
  // GET PRODUCT IMAGE
  // =====================================

  getProductImage(
    product: any
  ): string {

    return product.images &&
      product.images.length > 0

      ? product.images[0]

      : 'assets/no-image.png';

  }


  // =====================================
  // GET VIDEO URL
  // =====================================

  getVideoUrl(
    product: any
  ): string {

    return product.video
      ? product.video
      : '';

  }

  // =====================================
  // CHECK CERTIFICATE
  // =====================================

  hasCertificate(
    diamond: any
  ): boolean {

    return !!diamond.certificateUrl;

  }

  // =====================================
  // GET CERTIFICATE URL
  // =====================================

  getCertificateUrl(
    diamond: any
  ): string {

    return diamond.certificateUrl
      ? diamond.certificateUrl
      : '';

  }

  // =====================================
  // CHECK IMAGE CERTIFICATE
  // =====================================

  isCertificateImage(
    url: string
  ): boolean {

    return (

      url.includes('.jpg')

      ||

      url.includes('.jpeg')

      ||

      url.includes('.png')

      ||

      url.includes('image')

    );

  }

  // =====================================
  // CHECK PDF CERTIFICATE
  // =====================================

  isCertificatePdf(
    url: string
  ): boolean {

    return url.includes('.pdf');

  }



}