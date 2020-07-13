import { Component, OnInit } from '@angular/core';
import { LaunchPlanService } from '../services/launch-plan.service';
import { LaunchPlan } from '../models/launchplan';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '../global/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.css']
})
export class LauncherComponent implements OnInit {
  launchPlans: LaunchPlan[];

  constructor() { }

  ngOnInit() {
  }
}
