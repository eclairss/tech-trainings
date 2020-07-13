import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BranchComponent
  ],
  imports: [
    BranchRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class BranchModule { }
