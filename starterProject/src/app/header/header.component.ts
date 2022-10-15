import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginAuthService } from '../pages/sign-up-in/login-auth.service';
import { SignUpInComponent } from '../pages/sign-up-in/sign-up-in.component';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(public dialog: MatDialog, 
    private loginAuthService: LoginAuthService,
     private authService: AuthService,
     private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.loginAuthService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe;
  }

  // using angular material library to display component as popup dialog
  openDialog(){
    this.dialog.open(SignUpInComponent)
  }
  onLogOut(){
    this.loginAuthService.logout();
    this.authService.roles = '';
    this.router.navigate(['/'])
  }
  
}
