import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdmindService implements CanActivate {
  bla = false;
  //can activate New product route only if has role of Admin
  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot,
              state:RouterStateSnapshot,
              ): Observable<boolean> | Promise<boolean> | boolean{
                
                this.authService.isRole(this.authService.roles, 'Admin').subscribe(test =>{
                  this.bla = test
                })
                return this.bla && this.authService.roles.length >= 1;
              }
}
