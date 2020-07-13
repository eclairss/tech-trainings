import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: Login = new Login();
  loginFailed: boolean = false;
  firstInit = true;
  isValidatingLogin: boolean = false;

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: any) {
    this.isValidatingLogin = true;
    this.authService.ValidateUser(this.loginModel.Username, this.loginModel.Password)
      .then(() => {
        if (this.authService.IsValidUser) {
          alert('You logged in succesfully.');
          this.router.navigate(['']);
        }
        else
          this.loginFailed = true;

        this.isValidatingLogin = false;
      });

  }

}
