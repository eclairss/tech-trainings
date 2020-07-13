import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BranchCardComponent } from './components/branch-card/branch-card.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SeatPlanComponent } from './components/seat-plan/seat-plan.component';
import { SeatComponent } from './components/seat/seat.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScheduleCardComponent } from './components/schedule-movie-card/schedule-movie-card.component';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';

@NgModule({
  declarations: [
    MovieDetailComponent,
    MovieCardComponent,
    BranchCardComponent,
    SeatComponent,
    SeatPlanComponent,
    ScheduleCardComponent,
    ReservationSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    MovieDetailComponent,
    MovieCardComponent,
    BranchCardComponent,
    ScheduleCardComponent,
    SeatComponent,
    SeatPlanComponent,
    ReservationSummaryComponent,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class SharedModule {}
