import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpaceXService } from './services/api/space-x.service';
import { LaunchPlanService } from './services/launch-plan.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { UserRole } from './models/enums/userrole';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'spacex-launcher';
  oneLaunch = null;
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private spacexService: SpaceXService,
    private launchplanService: LaunchPlanService,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router) {

    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser.next(user);
      }
    });
  }

  ngOnInit() {
    console.log("SPACE X LAUNCHER INITIALIZED.")
    if (this.launchplanService.launchPlans.length <= 0) {
      // this.spacexService.InitialSeed();
    }

  }

  logOut() {
    this.authService.LogOutUser();
    if (!this.authService.IsValidUser)
      alert('You successfully logged out.');
    this.currentUser.next(null);
    this.router.navigate(['']);
  }

}
