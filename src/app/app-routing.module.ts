import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './CategoryConteroller/category/category.component';
import { LoginComponent } from './login/login.component';
import { CreateCategoryComponent } from './CategoryConteroller/create-category/create-category.component';
import { UpdateCategoryComponent } from './CategoryConteroller/update-category/update-category.component';
import { SubCategoryListComponent } from './SubCategory/sub-category-list/sub-category-list.component';
import { CreateSubcategoryComponent } from './SubCategory/create-subcategory/create-subcategory.component';
import { UpdateSubcategoryComponent } from './SubCategory/update-subcategory/update-subcategory.component';
import { SubSubCategoryListComponent } from './SubSubCategory/sub-sub-category-list/sub-sub-category-list.component';
import { SubSubCategoryCreateComponent } from './SubSubCategory/sub-sub-category-create/sub-sub-category-create.component';
import { SubSubCategoryUpdateComponent } from './SubSubCategory/sub-sub-category-update/sub-sub-category-update.component';
import { ProductListComponent } from './ProductController/product-list/product-list.component';
import { ProductCreateComponent } from './ProductController/product-create/product-create.component';
import { ProductUpdateComponent } from './ProductController/product-update/product-update.component';
import { AddressComponent } from './address/address.component';
import { ListBannerComponent } from './Banners/list-banner/list-banner.component';
import { CreateBannerComponent } from './Banners/create-banner/create-banner.component';
import { UpdateBannerComponent } from './Banners/update-banner/update-banner.component';
import { UserListComponent } from './user-list/user-list.component';
import { GoldListComponent } from './Gold-Rate/gold-list/gold-list.component';
import { GoldCreateComponent } from './Gold-Rate/gold-create/gold-create.component';
import { GoldUpdateComponent } from './Gold-Rate/gold-update/gold-update.component';
import { CouponListComponent } from './coupon/coupon-list/coupon-list.component';
import { CouponCreateComponent } from './coupon/coupon-create/coupon-create.component';
import { CouponUpdateComponent } from './coupon/coupon-update/coupon-update.component';
import { ReviewComponent } from './review/review.component';
import { MetalCreateComponent } from './metal/metal-create/metal-create.component';
import { MetalListComponent } from './metal/metal-list/metal-list.component';
import { MetalUpdateComponent } from './metal/metal-update/metal-update.component';
import { StonesCreateComponent } from './stones/stones-create/stones-create.component';
import { StonesListComponent } from './stones/stones-list/stones-list.component';
import { StonesUpdateComponent } from './stones/stones-update/stones-update.component';

const routes: Routes = [

  // First screen
  {
    path: '',
    component: LoginComponent
  },

  // Dashboard Layout
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      { path: 'Gold-list', component: GoldListComponent },
      { path: 'Gold-create', component: GoldCreateComponent },
      { path: 'Gold-update/:id', component: GoldUpdateComponent },

      { path: 'metal-list', component: MetalListComponent },
      { path: 'metal-create', component: MetalCreateComponent },
      { path: 'metal-update/:id', component: MetalUpdateComponent },

      { path: 'stones-list', component: StonesListComponent },
      { path: 'stones-create', component: StonesCreateComponent },
      { path: 'stones-update/:id', component: StonesUpdateComponent },
      { path: 'Coupon-lists', component: CouponListComponent },
      { path: 'Coupon-Crate', component: CouponCreateComponent },
      { path: 'update-coupon/:id', component: CouponUpdateComponent },
      { path: 'get-all-review', component: ReviewComponent },


      { path: 'category', component: CategoryComponent },
      { path: 'create-category', component: CreateCategoryComponent },
      { path: 'update-category/:id', component: UpdateCategoryComponent },
      { path: 'list_subcategory', component: SubCategoryListComponent },
      { path: 'create-subcategory', component: CreateSubcategoryComponent },
      { path: 'update-subcategory/:id', component: UpdateSubcategoryComponent },
      { path: 'subsubcategory', component: SubSubCategoryListComponent },
      { path: 'Create-subsubcategory', component: SubSubCategoryCreateComponent },
      { path: 'update-subsubcategory/:id', component: SubSubCategoryUpdateComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'create-product', component: ProductCreateComponent },
      { path: 'edit-product/:id', component: ProductUpdateComponent },
      { path: 'address', component: AddressComponent },
      { path: "banners", component: ListBannerComponent },
      { path: "create-banner", component: CreateBannerComponent },
      { path: "update-banner/:id", component: UpdateBannerComponent },
      { path: "user", component: UserListComponent }

    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
