import { Component, OnInit } from '@angular/core';
import { BikeDataService } from 'src/app/bike-data.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-list-items.component.html',
  styleUrls: ['./product-list-items.component.css']
})
export class ProductListItemsComponent implements OnInit {
  isFetching = true;
  //side deals array
  bikeList = [];
  //Top deal array
  topDeal = [];
  // public test = [];
 
  constructor( private _bikeData: BikeDataService) { }

  ngOnInit(): void {
    //executing the fetching
    this.fetchData()
  }
  //getting data from out http request in bikeData service and applying on local arrays
   fetchData(){
    this._bikeData.fetchData()
  .subscribe((data) => {
    //checking if its a top teal it will have main:true, if not pushing it all to the regular cards
    for(let card of data){
      if(card.main == true){
        this.topDeal.push(card)
    }else {
      this.bikeList.push(card);
    }
    }
        this.isFetching = false;
})
    }

 

}
