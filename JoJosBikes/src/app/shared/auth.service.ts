import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient){}

  fetchUsers(){
    return  this.http.get('https://bike-shop-59254-default-rtdb.europe-west1.firebasedatabase.app/Users.json')
    .pipe(map((res)=>{
      const users = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          users.push({id: key, ...res[key]})
        }
      }
      return users;
    }))
  }



  roles:string = null;
//check if has this role, than return true or false if there is or not
  isRole(role:string, TypedInRole: string): Observable<boolean>{
    
    return new Observable<boolean>(observer =>{
     
        if(role === TypedInRole){
          observer.next(true) ;
        }else{
          observer.next(false);
        }
      
  
    }
    )
  }
}
