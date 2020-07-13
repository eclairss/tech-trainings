import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(user: User) {
    this._userService.GetAllUserSubscription().subscribe(data => {
      const tempId = data[data.length - 1].id;
      user.id = tempId + 1;
      this._userService.Create(user).subscribe(
        data => {
          console.log(data);
          alert('Registration Success!');
          this.router.navigate(['login']);
        },
        error => {
          alert("Error on Registration");
        });
    });
    
  }
}
