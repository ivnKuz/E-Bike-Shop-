import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductListItemsComponent } from './productPage/product-list-items/product-list-items.component';
import {ContactComponent} from './pages/contact/contact.component'
import { ProductDetailsComponent } from './productPage/product-details/product-details.component';
import { AuthAdmindService } from './shared/auth-admin.service';
import { AuthIsAuthorisedService } from './shared/auth-is-authorised.service';

const routes: Routes = [
  {path: '', component: ProductListItemsComponent},
  {path: 'Contact', component: ContactComponent},
  {path: 'products/:productId', component: ProductDetailsComponent},
  {path:'order', canActivate:[AuthIsAuthorisedService], loadChildren:()=> import('./pages/order-page/order-page.module')
  .then(mod => mod.OrderPageModule)},
  {path:'create',canActivate: [AuthAdmindService], loadChildren: () => import('./pages/new-edit-product/new-product.module')
.then(mod => mod.NewProductModule)}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
