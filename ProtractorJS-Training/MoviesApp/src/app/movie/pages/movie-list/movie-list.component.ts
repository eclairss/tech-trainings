import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MovieService } from 'src/app/@core/services/movie.service';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-movie-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    let branchId = this.route.snapshot.params['branchId'];
    if (branchId) {
      branchId = +branchId;
    }
    const startDate = moment().format('YYYY-MM-DD');
    const endDate = moment()
      .add(30, 'day')
      .format('YYYY-MM-DD');
    this.movies$ = this.movieService.getMoviesByDate(startDate, endDate, branchId);
  }

  viewTrailerClickEvent(movie: Movie) {
    const trailerUrl = this.movieService.getTrailerUrl(movie.imdbID);

    window.open(trailerUrl, '_blank');
  }

  getTicket(movie: Movie) {
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }
}
