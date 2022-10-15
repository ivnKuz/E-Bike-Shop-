import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginAuthService } from './login-auth.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-sign-up-in',
  templateUrl: './sign-up-in.component.html',
  styleUrls: ['./sign-up-in.component.css']
})
export class SignUpInComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  constructor(private loginAuth: LoginAuthService, private authUser: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  fetchCurrentUserRoles(currentUserID: string){
    this.authUser.fetchUsers().subscribe(users =>{
      for(let user of users){
        if(currentUserID == user.id){
          this.authUser.roles = user.role;
          //saving current user role into the local storage to save it untill they log out
          localStorage.setItem('userRole', user.role);
        }
      }
    })
  }

  onSwitchToLogin(){
    this.isLoginMode = true;
  }
  onSwitchToSignUp(){
    this.isLoginMode = false;
  }

  facebookLogin(){
    this.loginAuth.FacebookAuth();
  }


  onSubmit(form: NgForm){
    // if not valid just do nothing
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const passConfirm = form.value.confirmPass;
    this.isLoading = true;

    if(this.isLoginMode){
      this.loginAuth.signIn(email, password).subscribe(resData => {
        this.fetchCurrentUserRoles(resData.localId);
        this.isLoading = false;
        this.dialog.closeAll()
      }, errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
      }
      );;
    }
    else{
     if(password == passConfirm){
     this.loginAuth.signUp(email, password).subscribe(resData => {
        //saving signed up usser to the database
     this.loginAuth.addUserToDatabase(resData.localId);
      this.isLoading = false;
      this.dialog.closeAll()
    }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
    }
    );;
     //create a new user with unique authid in the data base here
     }else{
      alert('Password does not match the confirm password input.')
     }
      
    }
    //the logic for both observables, they're just similar
    form.reset();
  }
} 
