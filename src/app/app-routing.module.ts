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
