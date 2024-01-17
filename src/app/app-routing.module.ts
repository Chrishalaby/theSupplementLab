import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CrudComponent } from './admin/crud/crud.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuardService } from './admin/login/service/auth-guard.service';
import { OfferUploadComponent } from './admin/offer-upload/offer-upload.component';
import { ProductUploadComponent } from './admin/product-upload/product-upload.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/product-list/products.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'offer-upload',
    component: OfferUploadComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'product-upload',
    component: ProductUploadComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'new-product-upload',
    component: CrudComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
