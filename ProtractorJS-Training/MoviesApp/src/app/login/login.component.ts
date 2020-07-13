import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { UserService } from '../@core/services/user.service';
import { Login } from 'src/app/@core/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  data: Login;
  subscriptions: Subscription;
  loginForm: FormGroup;
  error: string;
  returnUrlKey = 'returnUrl';
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrlKey] || '/';
  }

  ngOnInit() {
    this.authService.logout();
    this.data = new Login();
    this.subscriptions = new Subscription();
    this.createForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    const value = this.loginForm.value;
    this.data.email = value.email;
    this.data.password = value.password;

    this.subscriptions.add(
      this.authService.login(this.data).subscribe(
        auth => {
          this.error = '';
          this.subscriptions.add(
            this.userService.getByEmail(this.data.email).subscribe(user => {
              auth.email = user.email;
              auth.accessType = user.accessType;
              this.userService.updateUser(user);
              this.authService.updateAuth(auth);
              this.router.navigateByUrl(this.returnUrl);
            })
          );
        },
        error => {
          this.error = error.error;
        }
      )
    );
  }
}
