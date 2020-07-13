import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../@core/guards/admin.guard';
import { AdminComponent } from './admin.component';
import { MovieListComponent } from './pages/movie/movie-list/movie-list.component';
import { MovieAddComponent } from './pages/movie/movie-add/movie-add.component';
import { MovieEditComponent } from './pages/movie/movie-edit/movie-edit.component';
import { BranchListComponent } from './pages/branch/branch-list/branch-list.component';
import { BranchAddComponent } from './pages/branch/branch-add/branch-add.component';
import { BranchEditComponent } from './pages/branch/branch-edit/branch-edit.component';
import { CinemaAddComponent } from './pages/branch/cinema/cinema-add/cinema-add.component';
import { CinemaEditComponent } from './pages/branch/cinema/cinema-edit/cinema-edit.component';
import { ScheduleListComponent } from './pages/branch/schedule/schedule-list/schedule-list.component';
import { ScheduleAddComponent } from './pages/branch/schedule/schedule-add/schedule-add.component';
import { PaymentListComponent } from './pages/payment/payment-list/payment-list.component';
import { PaymentDetailComponent } from './pages/payment/payment-detail/payment-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'movie',
        children: [
          { path: '', component: MovieListComponent },
          { path: 'add', component: MovieAddComponent },
          { path: ':id', component: MovieEditComponent }
        ]
      },
      {
        path: 'branch',
        children: [
          { path: '', component: BranchListComponent },
          { path: 'add', component: BranchAddComponent },
          {
            path: ':id',
            children: [
              { path: '', component: BranchEditComponent },
              { path: 'cinema/add', component: CinemaAddComponent },
              { path: 'cinema/:cinemaId', component: CinemaEditComponent },
              {
                path: 'schedule',
                children: [
                  { path: '', component: ScheduleListComponent },
                  { path: 'add', component: ScheduleAddComponent }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'payment',
        children: [
          { path: '', component: PaymentListComponent },
          {
            path: ':id',
            children: [
              { path: '', component: PaymentDetailComponent },
            ]
          }
        ]
      }
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
