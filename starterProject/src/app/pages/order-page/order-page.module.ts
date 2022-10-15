import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageRoutingModule } from './order-page-routing.module';

console.warn('order loaded');
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    OrderPageRoutingModule
  ]
})
export class OrderPageModule { }

