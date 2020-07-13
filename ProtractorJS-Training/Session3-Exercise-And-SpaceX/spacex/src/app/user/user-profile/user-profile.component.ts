import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User = new User();
  
  constructor(private _userService: UserService) { 
    this._userService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  ngOnInit(): void {
  }

  updateUser(user: User) {
    this._userService.Update(user).subscribe(
      data=> {
        alert("Success Update");
      },
      error => {
        alert("Error on Update");
      }
    );
  }
}
