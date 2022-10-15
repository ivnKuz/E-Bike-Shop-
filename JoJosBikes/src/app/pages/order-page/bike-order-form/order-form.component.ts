import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BikeDataService } from 'src/app/bike-data.service';
import { orderDropDown } from '../dropdownInterface.model';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  isFetching = true;
  //arrays for ngFor to create multiple inputs;
  paymentMethods = ["Card", "PayPal", "Cash"];
  personalAdress = ["Country", "City", "Adress"];
  //empty array for name and description
  bikes = [];
  formSubmited = false;
  constructor(private _bikeData: BikeDataService) { }

  ngOnInit(): void {
    //subscribing to observable to get name and description from data file
    this.fetchData()

    //creating form control for the template
   this.orderForm = new FormGroup({
      'userAdress': new FormGroup({
        'Country': new FormControl(null, [Validators.required, Validators.minLength(4)]),
        'City': new FormControl(null, [Validators.required, Validators.minLength(4)]),
        'Adress': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      }),
      'paymentMethod': new FormControl('Card'),
      'deliveryDate': new FormControl(null , Validators.required),
       'bike': new FormControl(this.bikes[0]),
   });
  }
  //populating a dropdown with name and description of a product
  fetchData(){
   this._bikeData.fetchData()
    .subscribe((data: orderDropDown[])=>{
      for(let listItem of  data){
        this.bikes.push({name: listItem.name, description: listItem.description });
      }
      this.isFetching = false;
    })
  }

  onSubmit(){
    this.formSubmited = true;
  }
  //getting the boolean value from order-submited component if button
  //clicked, to reset the order form and hide the order submited
  newOrder(formSubmited:boolean){
      this.orderForm.reset();
      this.formSubmited = formSubmited;
  }

 
}
