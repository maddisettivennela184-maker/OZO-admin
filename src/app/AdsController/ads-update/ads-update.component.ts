import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsService } from 'src/app/Services/ads.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ads-update',
  templateUrl: './ads-update.component.html',
  styleUrls: ['./ads-update.component.css']
})
export class AdsUpdateComponent implements OnInit {

  adsId!: string;
   selectedImages: File[] = [];
    imagePreview: any[] = [];

  sections: any[] = [
    {
      key: 'section1',
      name: 'Section 1',
      title: '',
      description: '',
      isActive: true,
      existingImages: [],
      imageCards: [
        {
          file: null,
          preview: ''
        }
      ]
    },
    {
      key: 'section2',
      name: 'Section 2',
      title: '',
      description: '',
      isActive: true,
      existingImages: [],
      imageCards: [
        {
          file: null,
          preview: ''
        }
      ]
    },
    {
      key: 'section3',
      name: 'Section 3',
      title: '',
      description: '',
      isActive: true,
      existingImages: [],
      imageCards: [
        {
          file: null,
          preview: ''
        }
      ]
    }   
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adsService: AdsService
  ) {}

  ngOnInit(): void {

    this.adsId =
      this.route.snapshot.paramMap.get('id') || '';

    this.getAdsById();

  }

  getAdsById(): void {

    this.adsService
      .getAdsById(this.adsId)
      .subscribe({

        next: (res: any) => {

          const ad = res.data;

          this.sections.forEach(section => {

            if (ad[section.key]) {

              section.title =
                ad[section.key].title;

              section.description =
                ad[section.key].description;

              section.isActive =
                ad[section.key].isActive;

              section.existingImages =
                ad[section.key].images || [];

            }

          });

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  addImageCard(
    section: any
  ): void {

    section.imageCards.push({

      file: null,

      preview: ''

    });

  }

  removeImageCard(
    section: any,
    index: number
  ): void {

    section.imageCards.splice(
      index,
      1
    );

  }

onImageSelect(event: any, section: any) {

  const files = event.target.files;

  if (!section.newImages) {
    section.newImages = [];
  }

  if (!section.newImagePreviews) {
    section.newImagePreviews = [];
  }

  for (let file of files) {

    section.newImages.push(file);

    const reader = new FileReader();

    reader.onload = (e: any) => {
      section.newImagePreviews.push(e.target.result);
    };

    reader.readAsDataURL(file);

  }

}

removeImage(section: any, index: number): void {

  section.existingImages.splice(index, 1);

}

  updateAds(): void {

    const formData =
      new FormData();

  this.sections.forEach(section => {

  formData.append(`${section.key}Title`, section.title);

  formData.append(`${section.key}Description`, section.description);

  formData.append(`${section.key}IsActive`, section.isActive);

  formData.append(
    `${section.key}ExistingImages`,
    JSON.stringify(section.existingImages)
  );

  // NEW IMAGES
  if (section.newImages?.length) {

    section.newImages.forEach((file: File) => {

      formData.append(
        `${section.key}Images`,
        file
      );

    });

  }

});

    this.adsService
      .updateAds(
        this.adsId,
        formData
      )
      .subscribe({

        next: (res: any) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text:
              res.message ||
              'Ads Updated Successfully',

            confirmButtonColor:
              '#7b1113'

          }).then(() => {

            this.router.navigate([
              '/admin/Ads'
            ]);

          });

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              err.error?.message ||
              'Update Failed'

          });

        }

      });

  }

}