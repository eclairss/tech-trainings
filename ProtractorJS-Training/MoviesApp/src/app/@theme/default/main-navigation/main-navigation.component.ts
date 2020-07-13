import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Auth } from 'src/app/@core/models/Auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AccessType } from 'src/app/@core/constants/AccessType';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit, OnDestroy {
  auth: Auth;
  subscriptions: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.authService.auth$.subscribe(data => {
        this.auth = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.auth && this.auth.accessToken;
  }

  isAdmin() {
    return this.isLoggedIn() && this.auth.accessType === AccessType.Admin;
  }
}
