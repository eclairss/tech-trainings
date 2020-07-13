import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserRole } from 'src/app/models/enums/userrole';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let role = this.userService.currentUser.UserRole;
    console.log("role", role);
    if (role && (role == UserRole.Administrator.valueOf()))
      return true;
    else return false;
  }
  
  constructor(private router: Router,
    private userService: UserService) {

  }


  canLoad(route: Route, segments: UrlSegment[]) {
   
  }
}
