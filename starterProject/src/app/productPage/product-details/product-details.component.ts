import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeDataService } from 'src/app/bike-data.service';
import { faCartShopping, faMagicWandSparkles, faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  isOwner: boolean = false;
  isAdmin:boolean = false;
  editMode: boolean = false;
  isFetching = true;
  currentProduct = [];
  CartIcon = faCartShopping;
  wishListIcon = faMagicWandSparkles;
  stars = faStar;
  constructor(
     private _bikeData: BikeDataService,
     private activeRoute: ActivatedRoute,
     private authService: AuthService,
     private router: Router) { }

  ngOnInit(): void {
    this.fetchData()
    //checking if required roles exist on current logged in user
    this.authService.isRole(this.authService.roles, 'Owner').subscribe(role =>{
      this.isOwner = role;
    });
    this.authService.isRole(this.authService.roles, 'Admin').subscribe(role => {
      this.isAdmin = role;
    });
  }
  fetchData(){
  this._bikeData.fetchData()
  .subscribe((data) => {
    const routeParams = this.activeRoute.snapshot.paramMap;
    //getting the id from the query string
    const productIdFromRoute = routeParams.get('productId');
    //searching for correct id of the products we get from firebase
        for(let product of data){
          if(product.id == productIdFromRoute)
          {
           this.currentProduct.push(product);
           this.isFetching = false;
          }
        }
})
    }
    deleteCurrentProduct(id: string){
      this._bikeData.deleteItem(id).subscribe();
      alert('Product successfuly deleted!');
      this.router.navigate(['/']);
    }
    editCurrentProduct(){
      this.editMode = true;
    }
  
}

