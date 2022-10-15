import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthIsAuthorisedService implements CanActivate {

  constructor(private authService: AuthService) { }
  //can activate if authorised, if has any role in roles array user is authorised
  canActivate(route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean{
      //check if there's a role, only authenticated users have a role
      return !!this.authService.roles;
    }
}
