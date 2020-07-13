import { Component, OnInit, Input } from '@angular/core';
import { LaunchPlan } from 'src/app/models/launchplan';
import { Observable } from 'rxjs';

@Component({
  selector: 'launch-plan',
  templateUrl: './launch-plan.component.html',
  styleUrls: ['./launch-plan.component.css']
})
export class LaunchPlanComponent implements OnInit {

  @Input("launches") launchPlans : Observable<LaunchPlan[]>;

  constructor() { }

  ngOnInit() {
  }

}
