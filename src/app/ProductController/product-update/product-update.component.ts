import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  // =====================================
  // FORM
  // =====================================

  productForm!: FormGroup;

  // =====================================
  // PRODUCT ID
  // =====================================

  productId!: string;

  // =====================================
  // CATEGORY DATA
  // =====================================

  categories: any[] = [];

  subCategories: any[] = [];

  subSubCategories: any[] = [];

  // =====================================
  // FILES
  // =====================================

  selectedImages: File[] = [];

  selectedVideo!: File;

  selectedCertificate!: File;

  // =====================================
  // PREVIEW
  // =====================================

  imagePreview: any[] = [];

  videoPreview: any;

  // =====================================
  // CONSTRUCTOR
  // =====================================

  constructor(

    private fb: FormBuilder,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private productService:
      ProductService,

    private categoryService:
      CategoryService,

    private subCategoryService:
      SubcategoryService,

    private subSubCategoryService:
      SubsubcategoryService

  ) {}

  // =====================================
  // ON INIT
  // =====================================

  ngOnInit(): void {

    this.initializeForm();

    this.productId =
      this.route.snapshot.params['id'];

    this.getCategories();

    this.getProductById();

  }

  // =====================================
  // INITIALIZE FORM
  // =====================================

  initializeForm(): void {

    this.productForm =
      this.fb.group({

        name: ['', Validators.required],

        slug: [''],

        shortDescription: [''],

        description: [''],

        category: [''],

        subCategory: [''],

        subSubCategory: [''],

        productType: [''],

        gender: [''],

        occasion: [''],

        brand: [''],

        sku: [''],

        tags: [''],

        seoTitle: [''],

        seoDescription: [''],

        hallmarkCertified: [false],

        certificationIncluded: [false],

        featured: [false],

        bestSeller: [false],

        trending: [false],

        isActive: [true],

        variants:
          this.fb.array([])

      });

  }

  // =====================================
  // GET VARIANTS
  // =====================================

  get variants(): FormArray {

    return this.productForm.get(
      'variants'
    ) as FormArray;

  }

  // =====================================
  // CREATE VARIANT
  // =====================================

  createVariant(): FormGroup {

    return this.fb.group({

      size: [''],

      stock: [0],

      goldPurity: [''],

      goldColor: [''],

      grossWeight: [0],

      netWeight: [0],

      makingCharges: [0],

      wastagePercentage: [0],

      goldPrice: [0],

      basePrice: [0],

      discountPercentage: [0],

      finalPrice: [0],

      hasDiamond: [false],

      diamonds:
        this.fb.array([])

    });

  }

  // =====================================
  // ADD VARIANT
  // =====================================

  addVariant(): void {

    this.variants.push(
      this.createVariant()
    );

  }

  // =====================================
  // REMOVE VARIANT
  // =====================================

  removeVariant(
    index: number
  ): void {

    this.variants.removeAt(index);

  }

  // =====================================
  // GET DIAMONDS
  // =====================================

 getDiamonds(
  variantIndex: number
): FormArray {

  return this.variants
    .at(variantIndex)
    .get('diamonds') as FormArray;

}

  // =====================================
  // CREATE DIAMOND
  // =====================================

  createDiamond(): FormGroup {

    return this.fb.group({

      diamondType: ['NATURAL'],

      shape: [''],

      carat: [0],

      color: [''],

      clarity: [''],

      cut: [''],

      polish: [''],

      symmetry: [''],

      fluorescence: [''],

      certificateLab: ['NONE'],

      certificateNumber: [''],

      diamondPrice: [0],

      totalDiamonds: [1]

    });

  }

  // =====================================
  // ADD DIAMOND
  // =====================================

  addDiamond(
    variantIndex: number
  ): void {

    this.getDiamonds(
      variantIndex
    ).push(
      this.createDiamond()
    );

  }

  // =====================================
  // GET PRODUCT BY ID
  // =====================================

  getProductById(): void {

    this.productService
      .getProductById(
        this.productId
      )
      .subscribe({

        next: (res: any) => {

          const product =
            res.data;

          // PATCH FORM

          this.productForm.patchValue({

            name:
              product.name,

            slug:
              product.slug,

            shortDescription:
              product.shortDescription,

            description:
              product.description,

            category:
              product.category?._id,

            subCategory:
              product.subCategory?._id,

            subSubCategory:
              product.subSubCategory?._id,

            productType:
              product.productType,

            gender:
              product.gender,

            occasion:
              product.occasion,

            brand:
              product.brand,

            sku:
              product.sku,

            tags:
              product.tags?.join(','),

            seoTitle:
              product.seoTitle,

            seoDescription:
              product.seoDescription,

            hallmarkCertified:
              product.hallmarkCertified,

            certificationIncluded:
              product.certificationIncluded,

            featured:
              product.featured,

            bestSeller:
              product.bestSeller,

            trending:
              product.trending,

            isActive:
              product.isActive

          });

          // IMAGE PREVIEW

          this.imagePreview =
            product.images || [];

          // VIDEO PREVIEW

          this.videoPreview =
            product.video;

          // SUBCATEGORY

          this.onCategoryChange({

            target: {

              value:
                product.category?._id

            }

          });

          // SUBSUBCATEGORY

          this.onSubCategoryChange({

            target: {

              value:
                product.subCategory?._id

            }

          });

          // VARIANTS

          product.variants.forEach(
            (variant: any) => {

              const variantGroup =
                this.createVariant();

              variantGroup.patchValue({

                size:
                  variant.size,

                stock:
                  variant.stock,

                goldPurity:
                  variant.goldPurity,

                goldColor:
                  variant.goldColor,

                grossWeight:
                  variant.grossWeight,

                netWeight:
                  variant.netWeight,

                makingCharges:
                  variant.makingCharges,

                wastagePercentage:
                  variant.wastagePercentage,

                goldPrice:
                  variant.goldPrice,

                basePrice:
                  variant.basePrice,

                discountPercentage:
                  variant.discountPercentage,

                finalPrice:
                  variant.finalPrice,

                hasDiamond:
                  variant.hasDiamond

              });

              const diamondsArray =
                variantGroup.get(
                  'diamonds'
                ) as FormArray;

              variant.diamonds.forEach(
                (diamond: any) => {

                  const diamondGroup =
                    this.createDiamond();

                  diamondGroup.patchValue({

                    diamondType:
                      diamond.diamondType,

                    shape:
                      diamond.shape,

                    carat:
                      diamond.carat,

                    color:
                      diamond.color,

                    clarity:
                      diamond.clarity,

                    cut:
                      diamond.cut,

                    polish:
                      diamond.polish,

                    symmetry:
                      diamond.symmetry,

                    fluorescence:
                      diamond.fluorescence,

                    certificateLab:
                      diamond.certificateLab,

                    certificateNumber:
                      diamond.certificateNumber,

                    diamondPrice:
                      diamond.diamondPrice,

                    totalDiamonds:
                      diamond.totalDiamonds

                  });

                  diamondsArray.push(
                    diamondGroup
                  );

                }
              );

              this.variants.push(
                variantGroup
              );

            });

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =====================================
  // GET CATEGORIES
  // =====================================

  getCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          this.categories =
            res.data;

        }

      });

  }

  // =====================================
  // CATEGORY CHANGE
  // =====================================

  onCategoryChange(
    event: any
  ): void {

    const categoryId =
      event.target.value;

    this.subCategoryService
      .getSubCategoryByCategory(
        categoryId
      )
      .subscribe({

        next: (res: any) => {

          this.subCategories =
            res.data;

        }

      });

  }

  // =====================================
  // SUBCATEGORY CHANGE
  // =====================================

onSubCategoryChange(
  event: any
): void {

  const subCategoryId =
    event.target.value;

  this.subSubCategoryService
    .getSubSubCategoryBySubCategory(
      subCategoryId
    )
    .subscribe({

      next: (res: any) => {

        console.log(res);

        this.subSubCategories =
          res.data;

        // PATCH AFTER DATA LOAD

        setTimeout(() => {

          this.productForm
            .patchValue({

              subSubCategory:
                this.productForm.value
                  .subSubCategory

            });

        });

      },

      error: (err: any) => {

        console.log(err);
 Swal.fire({

    icon: 'success',

    title: 'Success',

    text: 'Updated Successfully'

  });
      }

    });

}

  // =====================================
  // IMAGE SELECT
  // =====================================

  onImageSelect(
    event: any
  ): void {

    const files =
      event.target.files;

    for (
      let i = 0;
      i < files.length;
      i++
    ) {

      this.selectedImages.push(
        files[i]
      );

      const reader =
        new FileReader();

      reader.onload = (e: any) => {

        this.imagePreview.push(
          e.target.result
        );

      };

      reader.readAsDataURL(
        files[i]
      );

    }

  }

  // =====================================
  // REMOVE IMAGE
  // =====================================

  removeImage(
    index: number
  ): void {

    this.imagePreview.splice(
      index,
      1
    );

    this.selectedImages.splice(
      index,
      1
    );

  }

  // =====================================
  // VIDEO SELECT
  // =====================================

  onVideoSelect(
    event: any
  ): void {

    const file =
      event.target.files[0];

    if (file) {

      this.selectedVideo =
        file;

      this.videoPreview =
        URL.createObjectURL(file);

    }

  }

  // =====================================
  // CERTIFICATE SELECT
  // =====================================

  onCertificateSelect(
    event: any
  ): void {

    this.selectedCertificate =
      event.target.files[0];

  }

  // =====================================
  // UPDATE PRODUCT
  // =====================================

 onSubmit(): void {

  const formData =
    new FormData();

  // SIMPLE FIELDS

  Object.keys(
    this.productForm.value
  ).forEach((key) => {

    if (

      key !== 'variants'

      &&

      key !== 'tags'

    ) {

      formData.append(

        key,

        this.productForm.value[key]

      );

    }

  });

  // TAGS

  formData.append(

    'tags',

    JSON.stringify(

      this.productForm.value.tags
        .split(',')

    )

  );

  // VARIANTS

  formData.append(

    'variants',

    JSON.stringify(

      this.productForm.value.variants

    )

  );

  // IMAGES

  this.selectedImages
    .forEach((image) => {

      formData.append(

        'images',

        image

      );

    });

  // VIDEO

  if (
    this.selectedVideo
  ) {

    formData.append(

      'video',

      this.selectedVideo

    );

  }

  // CERTIFICATE

  if (
    this.selectedCertificate
  ) {

    formData.append(

      'certificate',

      this.selectedCertificate

    );

  }

  // UPDATE API

  this.productService
    .updateProduct(

      this.productId,

      formData

    )
    .subscribe({

      // SUCCESS

      next: (res: any) => {

        console.log(res);

        Swal.fire({

          icon: 'success',

          title: 'Success',

          text:
            'Product Updated Successfully',

          timer: 2000,

          showConfirmButton:
            false

        });

        this.router.navigate([

          '/admin/product'

        ]);

      },

      // ERROR

      error: (err) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Oops...',

          text:
            'Update Failed'

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