import { Component, OnInit } from '@angular/core';
import { LaunchPlanService } from '../services/launch-plan.service';
import { Observable } from 'rxjs';
import { LaunchPlan } from '../models/launchplan';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  launches: Observable<LaunchPlan[]>;
  constructor(private launchplanService: LaunchPlanService) { }

  ngOnInit() {
    this.launchplanService.GetAll();
    this.launches = this.launchplanService.launchPlans$;
  }

}
