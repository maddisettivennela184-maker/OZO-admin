import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SizeChatService } from 'src/app/Services/size-chat.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';

@Component({
  selector: 'app-size-chat-update',
  templateUrl: './size-chat-update.component.html',
  styleUrls: ['./size-chat-update.component.css']
})
export class SizeChatUpdateComponent implements OnInit {

  sizeChartForm!: FormGroup;
  id!: string;
  selectedFile: File | null = null;
  imagePreview: string = '';
  subCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sizeChartService: SizeChatService,
    private subCategoryService: SubcategoryService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id') || '';

    console.log("ID => ", this.id);

    this.sizeChartForm = this.fb.group({
      title: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['']
    });

    this.getSubCategories();

  }

  // ==========================
  // Get All Sub Categories
  // ==========================

  getSubCategories() {

    this.subCategoryService.getAllSubCategories().subscribe({

      next: (res: any) => {

        console.log("Sub Categories => ", res);

        this.subCategories = res.data || [];

        // Load Size Chart after categories loaded
        this.getSizeChartById();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // ==========================
  // Get Size Chart By Id
  // ==========================

  getSizeChartById() {

    this.sizeChartService.getSizeChartById(this.id).subscribe({

      next: (res: any) => {

        console.log("Size Chart => ", res);

        const data = res.data;

        this.sizeChartForm.patchValue({

          title: data.title,

          subCategory: data.subCategory?._id || data.subCategory,

          description: data.description

        });

        this.imagePreview = data.image;

        console.log("Form Value => ", this.sizeChartForm.value);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // ==========================
  // File Change
  // ==========================

  onFileChange(event: any) {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result as string;

    };

    reader.readAsDataURL(file);

  }

  // ==========================
  // Update
  // ==========================

  onUpdate() {

    if (this.sizeChartForm.invalid) {

      this.sizeChartForm.markAllAsTouched();

      return;

    }

    const formData = new FormData();

    formData.append("title", this.sizeChartForm.value.title);
    formData.append("subCategory", this.sizeChartForm.value.subCategory);
    formData.append("description", this.sizeChartForm.value.description);

    if (this.selectedFile) {

      formData.append("image", this.selectedFile);

    }

    this.sizeChartService.updateSizeChart(this.id, formData).subscribe({

      next: (res: any) => {

        this.alert.success(res.message);

        this.router.navigate(['/admin/sizechat-list']);

      },

      error: (err: any) => {

        console.log(err);

        this.alert.error(err.error?.message || "Update Failed");

      }

    });

  }

  // ==========================
  // Back
  // ==========================

  goBack() {

    this.router.navigate(['/admin/sizechat-list']);

  }

}