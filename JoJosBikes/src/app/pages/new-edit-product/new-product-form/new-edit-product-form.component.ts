import { Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { productCard } from 'src/app/productPage/product-list-items/product-card.model';
import { BikeDataService } from 'src/app/bike-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-edit-product-form',
  templateUrl: './new-edit-product-form.component.html',
  styleUrls: ['./new-edit-product-form.component.css']
})
export class NewEditProductFormComponent implements OnInit {
  constructor(
    private _bikeDataService: BikeDataService, 
    private fb: FormBuilder,
    private router: Router) {
  }
  //edit mode on or off
  @Input() editMode: boolean = false;
  //Product Object Inputed for edit 
  @Input() Product: productCard;
  EditedProduct:productCard;
  //form ref
  newProductForm:FormGroup;
  @ViewChild('urlInput',{static: true}) urlInput: ElementRef;
 //source for image
  imageSrc: any;
  //creating colors and size arrays for checkboxes
  Colors: Array<any> = [
    { name: 'Black', value: 'Black' },
    { name: 'Blue', value: 'Blue' },
    { name: 'Red', value: 'Red' },
    { name: 'Yellow', value: 'Yellow' },
    { name: 'Purple', value: 'Purple' },
    { name: 'Other', value: 'Other' }
  ];
  Sizes: Array<any> = [
    { name: 'S', value: 'S' },
    { name: 'M', value: 'M' },
    { name: 'L', value: 'L' },
    { name: 'XL', value: 'XL' },
    { name: 'XXL', value: 'XXL' },
    { name: 'Other', value: 'Other' }
  ];
    //discount cannot be higher than 100%
  discountPattern = /^[0-9][0-9]?$|^100$/; 
  //only numbers pattern
  numbersPattern = /^[0-9]*$/;
  //array of ids for inputs to generate them with ngFor
  inputsIds = ['discount','price','description', 'shop'];
  //same for options
  shippingOptions = ['Free shipping', 'Paid Shipping', 'No Shipping']

 

  
  ngOnInit(): void {
    //validators and controlls for a reactive form
    this.newProductForm = new FormGroup({
      'bikeName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'imgFile': new FormControl(''),
      'imgUrl': new FormControl(''),
      'discount': new FormControl('', [Validators.required, Validators.maxLength(3), Validators.pattern(this.discountPattern)]),
      'price': new FormControl('', [Validators.required, Validators.pattern(this.numbersPattern)]),
      'description': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'shop': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'shipping': new FormControl(this.shippingOptions[0]),
      'condition': new FormControl('New'),
      'colors': this.fb.array([], Validators.required),
      'sizes': this.fb.array([],  Validators.required),
    });
    if(this.editMode){
      this.newProductForm.patchValue({
        bikeName: this.Product.name,
        imgFile: '', 
        imgUrl: this.Product.imgUrl,
        discount: this.Product.discount,
        price: this.Product.price,
        description: this.Product.description,
        shop: this.Product.shop,
        shipping: this.Product.shipping,
        condition: this.Product.new ? 'New':'Used',
      })
    }
  }
  //onchange for a file input
  imageSelected(event){
    this.imageSrc = null;
    //applying image full name to url input
    this.urlInput.nativeElement.value = event.target.files[0].name;
    //previewing image from a file
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
  }
  }
  //previewing the image from url
  enteredUrl(){
    this.imageSrc = this.urlInput.nativeElement.value;
  }

  //checkign which checkboxes checked for color array
  onCheckboxColorChange(e) {
    const colorArray: FormArray = this.newProductForm.get('colors') as FormArray;
    if (e.target.checked) {
      colorArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      colorArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          colorArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  //checkign which checkboxes checked for size array
  onCheckboxSizeChange(e) {
    const sizerray: FormArray = this.newProductForm.get('sizes') as FormArray;
    if (e.target.checked) {
      sizerray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      sizerray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          sizerray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  

  submitNewProduct(){
   //sending put request to edit the item
    if(this.editMode){
      this.EditedProduct = {
        name: this.newProductForm.value.bikeName,
        imgFile: this.newProductForm.value.imgFile,
        imgUrl: this.newProductForm.value.imgUrl,
        discount: this.newProductForm.value.discount,
        price: this.newProductForm.value.price,
        description: this.newProductForm.value.description,
        shop: this.newProductForm.value.shop,
        shipping: this.newProductForm.value.shipping,
        new: this.newProductForm.value.condition == 'New' ? true: false,
        main: false,
        color: this.newProductForm.value.colors,
        size: this.newProductForm.value.sizes
      }
      this.EditedProduct['imgUrl'] = this.imageSrc;
      this._bikeDataService.editItem(this.Product.id, this.EditedProduct);
      alert('Product wass successfully edited!');
      this.router.navigate(['/']);
      
    }
     // saving everything in a new object, submitting the form
    else{
      this.Product =  {
        name: this.newProductForm.value.bikeName,
        imgFile: this.newProductForm.value.imgFile,
        imgUrl: this.newProductForm.value.imgUrl,
        discount: this.newProductForm.value.discount,
        price: this.newProductForm.value.price,
        description: this.newProductForm.value.description,
        shop: this.newProductForm.value.shop,
        shipping: this.newProductForm.value.shipping,
        new: this.newProductForm.value.condition == 'New' ? true: false,
        main: false,
        color: this.newProductForm.value.colors,
        size: this.newProductForm.value.sizes
      };
      this.Product['imgUrl'] = this.imageSrc;
      //subscribing to a post request to our database in firebase
      this._bikeDataService.postData(this.Product);
      alert('New Product successfully created!');
      this.router.navigate(['/']);
    }
    
    this.newProductForm.reset();
  }
  
}
