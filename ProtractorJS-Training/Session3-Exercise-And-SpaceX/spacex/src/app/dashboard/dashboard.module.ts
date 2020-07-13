import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { LauncherModule } from '../launcher/launcher.module';
import { LaunchPlanItemComponent } from '../launcher/launch-plan-item/launch-plan-item.component';
import { LaunchPlanComponent } from '../launcher/launch-plan/launch-plan.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LaunchPlanItemComponent,
    LaunchPlanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    LauncherModule
  ]
})
export class DashboardModule { }
