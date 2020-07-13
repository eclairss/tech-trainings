import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Register } from 'src/app/@core/models/Register';
import { AccessType } from '../@core/constants/AccessType';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  data: Register;
  subscriptions: Subscription;
  registerForm: FormGroup;
  error: string;
  returnUrlKey = 'returnUrl';
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.data = new Register();
    this.subscriptions = new Subscription();
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrlKey] || '/';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: ['', []],
      lastName: ['', [Validators.required]],
      birthDay: ['', [Validators.required]]
    });
  }

  onRegister() {
    const value = this.registerForm.value;
    this.data.email = value.email;
    this.data.password = value.password;
    this.data.firstName = value.firstName;
    this.data.middleName = value.middleName;
    this.data.lastName = value.lastName;
    this.data.birthDay = value.birthDay;

    // HACK: Cheat code to create an admin account.
    if (this.data.email.includes('@admin')) {
      this.data.accessType = AccessType.Admin;
    } else {
      this.data.accessType = AccessType.Basic;
    }

    this.subscriptions.add(
      this.authService.register(this.data).subscribe(
        data => {
          this.error = '';
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl }});
        },
        error => {
          this.error = error.error;
        }
      )
    );
  }
}
