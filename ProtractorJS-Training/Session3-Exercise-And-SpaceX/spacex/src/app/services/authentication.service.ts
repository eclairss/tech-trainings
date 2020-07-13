import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public IsValidUser: boolean = false;


  constructor(private userService: UserService) {
    
  }

  public async ValidateUser(username: string, password: string) {
    await this.userService.GetByUsername(username)
      .toPromise().then(data => {
        let gotUser = data[0];
        if (gotUser) {
          if (gotUser.Password === password) {
            this.userService.currentUser = gotUser;
            this.IsValidUser = true;
          }
        }
      });
  }

  public LogOutUser()
  {
    this.userService.currentUser = null;
    this.IsValidUser = false;
  }
}







