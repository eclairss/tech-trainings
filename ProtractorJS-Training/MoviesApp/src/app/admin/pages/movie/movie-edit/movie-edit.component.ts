import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MovieService } from 'src/app/@core/services/movie.service';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit, OnDestroy {
  movie$: Observable<Movie>;
  subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.subscriptions = new Subscription();
    this.movie$ = this.movieService.get(id);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
