import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productCard } from './productPage/product-list-items/product-card.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BikeDataService {
  //links for
  linkPostGet = 'https://bike-shop-59254-default-rtdb.europe-west1.firebasedatabase.app/products/-NDslUmEdNKptqk67LZl.json';
  linkUpdateDelete = 'https://bike-shop-59254-default-rtdb.europe-west1.firebasedatabase.app/products/-NDslUmEdNKptqk67LZl/';
  // linkPostUSers = 'https://bike-shop-59254-default-rtdb.europe-west1.firebasedatabase.app/users.json'


  constructor(private http: HttpClient) { }


  //posting data
  postData(products: productCard){
    this.http.post(this.linkPostGet, products)
    .subscribe()
  }
  
//fetching data from a firebase realtime database
  fetchData(){
  return  this.http.get<productCard[]>(this.linkPostGet)
  .pipe(map((res)=>{
    const products = [];
    for(const key in res){
      if(res.hasOwnProperty(key)){
        products.push({id: key, ...res[key]})
      }
    }
    return products;
  }))
}

  // deleting item from firebase by its id
deleteItem(itemId:string){
  return this.http.delete(this.linkUpdateDelete + itemId + '.json');
}

//edit chosen product
editItem(itemId:string, value: productCard){
  const options = {
    headers:{
        'Content-Type': 'multipart/form-data'
    }
}
   this.http.put(this.linkUpdateDelete + itemId + '.json', value, options)
   .subscribe();
}

}

