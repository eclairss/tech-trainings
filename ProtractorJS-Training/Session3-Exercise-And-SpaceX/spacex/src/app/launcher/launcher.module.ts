import { DecimalOnlyDirective } from './../global/directives/decimal-only.directive';
import { LaunchPlanService } from 'src/app/services/launch-plan.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LauncherComponent } from './launcher.component';
import { FormLauncherComponent } from './form-launcher/form-launcher.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KickoffHighlightDirective } from '../global/kickoff-highlight.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LauncherComponent,
    FormLauncherComponent,
    KickoffHighlightDirective,
    DecimalOnlyDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule 
  ],
  providers: [
    LaunchPlanService
  ],
  exports: [
    KickoffHighlightDirective
  ]
})
export class LauncherModule { }
