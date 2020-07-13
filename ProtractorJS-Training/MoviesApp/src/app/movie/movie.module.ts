import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';


@NgModule({
  declarations: [MovieListComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
    DialogModule,
  ]
})
export class MovieModule { }
