import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import {KeyFilterModule} from 'primeng/keyfilter';
import { SharedModule } from '../@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MovieListComponent } from './pages/movie/movie-list/movie-list.component';
import { MovieAddComponent } from './pages/movie/movie-add/movie-add.component';
import { MovieEditComponent } from './pages/movie/movie-edit/movie-edit.component';
import { BranchAddComponent } from './pages/branch/branch-add/branch-add.component';
import { BranchListComponent } from './pages/branch/branch-list/branch-list.component';
import { BranchEditComponent } from './pages/branch/branch-edit/branch-edit.component';
import { CinemaListComponent } from './pages/branch/cinema/cinema-list/cinema-list.component';
import { CinemaAddComponent } from './pages/branch/cinema/cinema-add/cinema-add.component';
import { CinemaEditComponent } from './pages/branch/cinema/cinema-edit/cinema-edit.component';
import { ScheduleListComponent } from './pages/branch/schedule/schedule-list/schedule-list.component';
import { ScheduleAddComponent } from './pages/branch/schedule/schedule-add/schedule-add.component';
import { ScheduleCardComponent } from './pages/branch/schedule/schedule-card/schedule-card.component';
import { PaymentListComponent } from './pages/payment/payment-list/payment-list.component';
import { PaymentDetailComponent } from './pages/payment/payment-detail/payment-detail.component';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieAddComponent,
    AdminComponent,
    MovieEditComponent,
    BranchAddComponent,
    BranchListComponent,
    BranchEditComponent,
    CinemaListComponent,
    CinemaAddComponent,
    CinemaEditComponent,
    ScheduleListComponent,
    ScheduleAddComponent,
    ScheduleCardComponent,
    PaymentListComponent,
    PaymentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    SharedModule,
    AdminRoutingModule,
    KeyFilterModule
  ]
})
export class AdminModule {}
