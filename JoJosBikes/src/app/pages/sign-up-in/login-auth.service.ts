import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators'
import { throwError, BehaviorSubject } from 'rxjs'
import { User } from './user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { getAuth, signInWithPopup, FacebookAuthProvider, signOut } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
//the data we get in the response from backend
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  // emmiter to monitor which user is logged in right now
  // note to self: behavior subject gives access to previously emitted value, even if that value was emitted
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, 
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog) { }

  FacebookAuth() {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // this.handleAuthentication()
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        //making a new user, giving local roles, because all facebook users are roles of Customers, no need to give other roles
        let facebookUser = new User(user.email,user.uid)
        this.user.next(facebookUser);
        localStorage.setItem('userData', JSON.stringify(user));
        this.authService.roles = 'Customer';
        localStorage.setItem('userRole', 'Customer');
        //closing the login dialog window component when finished authorization
        this.dialog.closeAll();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
    
        // ...
      });
  }
  private handleAuthentication(email: string, userId:string, token: string, expiresIn: number){
    //expires in comes in seconds string so multiplying on 1000 to convert to milsec
const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

const user = new User(email, userId, token, expirationDate);
//emit this as currently logged user
this.user.next(user);
//timer in m. seconds
this.autologout(expiresIn * 1000)
//saving the current user data to local storage
localStorage.setItem('userData', JSON.stringify(user));
}


  addUserToDatabase(Uid: string){
    return this.http.post('https://bike-shop-59254-default-rtdb.europe-west1.firebasedatabase.app/Users.json', {
      id: Uid,
      //customer is a default role for every user
      role: 'Customer'
    }).subscribe();
  }

  signUp(email: string, password: string){
    // signing user up
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI8LgzcyxdxSev6wIOblRAII8WQAArDA4',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        +resData.expiresIn)
     
    }));
  }

  //auto logins user if they refresh the page, close etc without clicking logout button
  autoLogin(){
    //converting back into a js object
    const userData: {
      email:string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    //checking if there is a data of currently logged user
    if(!userData){
      return
    }
    const loadedUser = new User(
      userData.email,
       userData.id, 
       userData._token,
        new Date(userData._tokenExpirationDate)
        );
        //getter in the user class, that checks if token is valid
        if(loadedUser.token){
          this.user.next(loadedUser);
          //future expiration date - current date in m. seconds
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
          new Date().getTime();
          this.autologout(expirationDuration)
          //getting the currently logged in user role
          this.authService.roles = localStorage.getItem('userRole')
        }
  }



  signIn(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI8LgzcyxdxSev6wIOblRAII8WQAArDA4',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        +resData.expiresIn)
     
    }));
  }



  //logout
  logout(){
    //user observable sets to null and deleting all the roles and data about current user in the local storage
    this.user.next(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
    this.authService.roles = null;

    //facebook logout 
    const auth = getAuth();
  signOut(auth).then(() => {
  // Sign-out successful.
  this.authService.roles = null;
  }).catch((error) => {
  // An error happened.
  console.log('Facebook signout error occured: '+ error);
  });
    
    //if we have an active timer of autologout, then if logout is pressed, clear it
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  //log user out when token is expired
  autologout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  //handlign error types
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'an unknown error occured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage)
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email exists already';
        break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email or password is wrong.';
          break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Email or password is wrong.'
            break;
    }
    return throwError(errorMessage)
  }
}
