import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'
import {  MatButtonModule } from '@angular/material/button'

//module for material imports
const MaterialComponents = [
  MatDialogModule,
  MatButtonModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
