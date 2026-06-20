  import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
  import { Ads } from 'src/app/Models/Ads';
import { AdsService } from 'src/app/Services/ads.service';
import Swal from 'sweetalert2';


  @Component({
    selector: 'app-ads-list',
    templateUrl: './ads-list.component.html',
    styleUrls: ['./ads-list.component.css']
  })
  export class AdsListComponent implements OnInit, AfterViewInit {

  constructor(
    private adsService: AdsService,
    private router: Router
  ) {}

  displayedColumns: string[] = [
    'section',
    'title',
    'description',
    'image1',
    'image2',
    'image3'
  ];

  dataSource =
    new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  adsId = '';

  ngOnInit(): void {

    this.getAds();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

  }

  getAds(): void {

    this.adsService
      .getAllAds()
      .subscribe({

        next: (res: any) => {

          const rows: any[] = [];

          if (
            res.data &&
            res.data.length > 0
          ) {

            const ad =
              res.data[0];

            this.adsId =
              ad._id;

            if (ad.section1) {

              rows.push({

                sectionName:
                  'Section 1',

                ...ad.section1

              });

            }

            if (ad.section2) {

              rows.push({

                sectionName:
                  'Section 2',

                ...ad.section2

              });

            }

            if (ad.section3) {

              rows.push({

                sectionName:
                  'Section 3',

                ...ad.section3

              });

            }

            if (ad.section4) {

              rows.push({

                sectionName:
                  'Section 4',

                ...ad.section4

              });

            }

            if (ad.section5) {

              rows.push({

                sectionName:
                  'Section 5',

                ...ad.section5

              });

            }

          }

          this.dataSource.data =
            rows;

          this.dataSource.paginator =
            this.paginator;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  editAds(): void {

    this.router.navigate([
      '/admin/update-Ads',
      this.adsId
    ]);

  }

  deleteAds(): void {

    if (
      confirm(
        'Are you sure?'
      )
    ) {

      this.adsService
        .deleteAds(this.adsId)
        .subscribe({

          next: () => {

            this.getAds();

          },

          error: (err) => {

            console.log(err);

          }

        });

    }

  }

  // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}