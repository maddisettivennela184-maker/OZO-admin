import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {


  productForm!: FormGroup;

  // =========================
  // FILES
  // =========================
  categories: any[] = [];

  subCategories: any[] = [];

  subSubCategories: any[] = [];

  selectedImages: File[] = [];

  selectedVideo!: File;

  selectedCertificate!: File;

  imagePreview: string[] = [];

  videoPreview: string = '';
  certificateFile: File | null = null;
  certificatePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,

    private subCategoryService: SubcategoryService,

    private subSubCategoryService:

      SubsubcategoryService,
    public router:
      Router,

  ) {

    this.productForm = this.fb.group({

      name: ['', Validators.required],

      slug: [''],

      shortDescription: [''],

      description: ['', Validators.required],

      category: [''],

      subCategory: [''],

      subSubCategory: [''],

      productType: ['', Validators.required],

      gender: [''],

      occasion: [''],

      brand: [''],

      hallmarkNumber: [''],

      hallmarkCertified: [true],

      certificationIncluded: [true],

      featured: [false],

      bestSeller: [false],

      trending: [false],

      newArrival: [false],

      tags: [''],

      seoTitle: [''],

      seoDescription: [''],

      metaKeywords: [''],

      isActive: [true],

      variants: this.fb.array([])

    });

    this.addVariant();

  }
  ngOnInit(): void {

    this.getCategories();
  }

  // =========================================================
  // VARIANTS
  // =========================================================
  getCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          this.categories =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  onCategoryChange(event: any): void {

    const categoryId =
      event.target.value;

    this.productForm.patchValue({

      subCategory: '',

      subSubCategory: ''

    });

    this.subSubCategories = [];

    this.subCategoryService
      .getSubCategoryByCategory(
        categoryId
      )
      .subscribe({

        next: (res: any) => {

          this.subCategories =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  onSubCategoryChange(
    event: any
  ): void {

    const subCategoryId =
      event.target.value;

    console.log(subCategoryId);

    this.productForm.patchValue({

      subSubCategory: ''

    });

    this.subSubCategoryService
      .getSubSubCategoryBySubCategory(
        subCategoryId
      )
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.subSubCategories =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  get variants(): FormArray {

    return this.productForm.get(
      'variants'
    ) as FormArray;

  }

  createVariant(): FormGroup {

    return this.fb.group({

      size: [''],

      sku: ['', Validators.required],

      stock:  [null, Validators.required],


      metalType:  ['', Validators.required],

      metalPurity: ['', Validators.required],

      metalColor: ['yellow'],

      grossWeight: [null, Validators.required],

      netWeight: [null, Validators.required],

      wastagePercentage: [0],

      makingCharges: [0],

      makingChargeType: ['fixed'],

      discountPercentage: [0],

      stones: this.fb.array([])

    });

  }

  addVariant(): void {

    const variant =
      this.createVariant();

    this.variants.push(
      variant
    );

  }

  removeVariant(index: number): void {

    this.variants.removeAt(index);

  }

  // =========================================================
  // DIAMONDS
  // =========================================================
  getStones(
    variantIndex: number
  ): FormArray {

    return this.variants
      .at(variantIndex)
      .get('stones') as FormArray;

  }

  createStone(): FormGroup {

    return this.fb.group({

      stoneType: ['diamond'],

      stoneCategory: ['natural'],

      quality: [''],

      totalWeight: [0],

      quantity: [1]

    });

  }
  addStone(
    variantIndex: number
  ): void {

    this.getStones(
      variantIndex
    ).push(
      this.createStone()
    );

  }

  removeStone(
    variantIndex: number,
    stoneIndex: number
  ): void {

    this.getStones(
      variantIndex
    ).removeAt(
      stoneIndex
    );

  }

  // =========================================================
  // MULTIPLE IMAGES
  // =========================================================

  onImageSelect(event: any): void {

    const files = event.target.files;

    if (files.length > 0) {

      for (let i = 0; i < files.length; i++) {

        this.selectedImages.push(files[i]);

        const reader = new FileReader();

        reader.onload = (e: any) => {

          this.imagePreview.push(
            e.target.result
          );

        };

        reader.readAsDataURL(files[i]);

      }

    }

  }

  removeImage(index: number): void {

    this.selectedImages.splice(
      index,
      1
    );

    this.imagePreview.splice(
      index,
      1
    );

  }

  // =========================================================
  // VIDEO
  // =========================================================

  onVideoSelect(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.selectedVideo = file;

      this.videoPreview =
        URL.createObjectURL(file);

    }

  }

  // =========================================================
  // CERTIFICATE
  // =========================================================

  // onCertificateSelect(
  //   event: any
  // ): void {

  //   const file = event.target.files[0];

  //   if (file) {

  //     this.selectedCertificate = file;

  //   }

  // }
  onCertificateSelect(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.certificateFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.certificatePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  removeCertificate(): void {
    this.certificateFile = null;
    this.certificatePreview = null;
  }

  // =========================================================
  // SUBMIT
  // =========================================================
  onSubmit(): void {
    

   if (this.productForm.invalid) {

  this.productForm.markAllAsTouched();

  Swal.fire({
    icon: 'error',
    title: 'Validation Error',
    text: 'Please fill all required fields'
  });

  return;

}

    const formValue =
      this.productForm.value;

    const formData =
      new FormData();

    // =========================
    // TAGS ARRAY
    // =========================

    formValue.tags =
      formValue.tags
        ? formValue.tags
          .split(',')
          .map((tag: string) =>
            tag.trim()
          )
        : [];

    // =========================
    // META KEYWORDS ARRAY
    // =========================

    formValue.metaKeywords =
      formValue.metaKeywords
        ? formValue.metaKeywords
          .split(',')
          .map((keyword: string) =>
            keyword.trim()
          )
        : [];

    // =========================
    // VARIANTS
    // =========================

    formData.append(
      'variants',
      JSON.stringify(
        formValue.variants
      )
    );

    // =========================
    // OTHER FIELDS
    // =========================

    Object.keys(formValue)
      .forEach((key) => {

        if (

          key !== 'variants' &&

          key !== 'tags' &&

          key !== 'metaKeywords'

        ) {

          formData.append(

            key,

            formValue[key]

          );

        }

      });

    // =========================
    // TAGS
    // =========================

    formData.append(

      'tags',

      JSON.stringify(
        formValue.tags
      )

    );

    // =========================
    // META KEYWORDS
    // =========================

    formData.append(

      'metaKeywords',

      JSON.stringify(
        formValue.metaKeywords
      )

    );

    // =========================
    // IMAGES
    // =========================

    this.selectedImages
      .forEach((file) => {

        formData.append(

          'images',


          file

        );

      });

    // =========================
    // VIDEO
    // =========================

    if (this.selectedVideo) {

      formData.append(

        'video',

        this.selectedVideo

      );

    }

    // =========================
    // CERTIFICATE
    // =========================

    if (
      this.selectedCertificate
    ) {

      formData.append(

        'certificate',

        this.selectedCertificate

      );

    }

    // =========================
    // API CALL
    // =========================

    this.productService
      .createProduct(
        formData
      )
      .subscribe({

        next: (res) => {

          console.log(res);

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text:
              'Product Created Successfully',

            timer: 2000,

            showConfirmButton:
              false

          });

          this.router.navigate([

            '/admin/product'

          ]);

        },

       error: (err) => {

  console.log(err);

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: err.error.message
  });

}

      });

  }
  goBack() {
    this.router.navigate([
      '/admin/product'
    ]);
  }
}