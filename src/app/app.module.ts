import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './CategoryConteroller/category/category.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CreateCategoryComponent } from './CategoryConteroller/create-category/create-category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GoldListComponent } from './Gold-Rate/gold-list/gold-list.component';


import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryComponent } from './CategoryConteroller/update-category/update-category.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SubCategoryListComponent } from './SubCategory/sub-category-list/sub-category-list.component';
import { CreateSubcategoryComponent } from './SubCategory/create-subcategory/create-subcategory.component';
import { UpdateSubcategoryComponent } from './SubCategory/update-subcategory/update-subcategory.component';
import { SubSubCategoryListComponent } from './SubSubCategory/sub-sub-category-list/sub-sub-category-list.component';
import { SubSubCategoryCreateComponent } from './SubSubCategory/sub-sub-category-create/sub-sub-category-create.component';
import { SubSubCategoryUpdateComponent } from './SubSubCategory/sub-sub-category-update/sub-sub-category-update.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductListComponent } from './ProductController/product-list/product-list.component';
import { ProductCreateComponent } from './ProductController/product-create/product-create.component';
import { ProductUpdateComponent } from './ProductController/product-update/product-update.component';
import { AddressComponent } from './address/address.component';
import { ListBannerComponent } from './Banners/list-banner/list-banner.component';
import { CreateBannerComponent } from './Banners/create-banner/create-banner.component';
import { UpdateBannerComponent } from './Banners/update-banner/update-banner.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewCategoryComponent } from './View-dialog-Controllers/view-category/view-category.component';
import { ViewSubCategoryComponent } from './View-dialog-Controllers/view-sub-category/view-sub-category.component';
import { ViewSubSubCategoryComponent } from './View-dialog-Controllers/view-sub-sub-category/view-sub-sub-category.component';
import { ViewProductComponent } from './View-dialog-Controllers/view-product/view-product.component';
import { MatButtonModule } from '@angular/material/button';
import { GoldCreateComponent } from './Gold-Rate/gold-create/gold-create.component';
import { GoldUpdateComponent } from './Gold-Rate/gold-update/gold-update.component';
import { CouponListComponent } from './coupon/coupon-list/coupon-list.component';
import { CouponCreateComponent } from './coupon/coupon-create/coupon-create.component';
import { CouponUpdateComponent } from './coupon/coupon-update/coupon-update.component';
import { ReviewComponent } from './review/review.component';
import { MetalCreateComponent } from './metal/metal-create/metal-create.component';
import { MetalListComponent } from './metal/metal-list/metal-list.component';
import { MetalUpdateComponent } from './metal/metal-update/metal-update.component';
import { StonesUpdateComponent } from './stones/stones-update/stones-update.component';
import { StonesCreateComponent } from './stones/stones-create/stones-create.component';
import { StonesListComponent } from './stones/stones-list/stones-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    CategoryComponent,
    LoginComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteConfirmationComponent,
    SubCategoryListComponent,
    CreateSubcategoryComponent,
    UpdateSubcategoryComponent,
    SubSubCategoryListComponent,
    SubSubCategoryCreateComponent,
    SubSubCategoryUpdateComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    AddressComponent,
    ListBannerComponent,
    CreateBannerComponent,
    UpdateBannerComponent,
    UserListComponent,
    ViewCategoryComponent,
    ViewSubCategoryComponent,
    ViewSubSubCategoryComponent,
    ViewProductComponent,  GoldListComponent,
    GoldCreateComponent,
    GoldUpdateComponent,
    CouponListComponent,
    CouponCreateComponent,
    CouponUpdateComponent,
    ReviewComponent,
    MetalCreateComponent,
    MetalListComponent,
    MetalUpdateComponent,
    StonesUpdateComponent,
    StonesCreateComponent,
    StonesListComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
 ReactiveFormsModule,

      MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
     MatIconModule,
    MatSortModule,MatSnackBarModule,
    MatDialogModule,
     MatSelectModule,
    //  MatButtonModule 
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
