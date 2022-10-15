import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEditProductFormComponent } from './new-product-form/new-edit-product-form.component';
const routes: Routes = [
{path:'new-product', component:NewEditProductFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProductRoutingModule { }
