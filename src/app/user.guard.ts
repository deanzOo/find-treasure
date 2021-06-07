import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './user/user-auth.service';
import { User } from './models/users';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
  close = true;

  constructor(private userService: UserAuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.loggedIn) {
      return new Promise<boolean>((resolve, reject) => {
        this.userService.login().then(() => {
          resolve(true);
        }, () => {
          reject(false);
        });
      });
    } else {
      return true;
    }
  }
}
