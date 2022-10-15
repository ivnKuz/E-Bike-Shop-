
import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from './pages/sign-up-in/login-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private loginSevice: LoginAuthService){

  }
  ngOnInit(): void {
    //auto login user as soon as the app starts, if there's still logged in user
    this.loginSevice.autoLogin();
  }
}
