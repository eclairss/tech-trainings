import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
  map
} from 'rxjs/operators';
import { OMDbService } from 'src/app/@core/services/omdb.service';
import { MovieService } from 'src/app/@core/services/movie.service';
import { MapperService } from 'src/app/@core/services/mapper.service';
import { OMDbMovie } from 'src/app/@core/models/OMDbMovie';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit, OnDestroy {
  searchItem: OMDbMovie;
  movie: Movie;
  searching: boolean;
  searchFailed: boolean;
  subscriptions: Subscription;

  constructor(
    private router: Router,
    private omdbService: OMDbService,
    private mapperService: MapperService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.searchItem = new OMDbMovie();
    this.searchItem.Title = '';
    this.subscriptions = new Subscription();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        term.length < 2
          ? of([])
          : this.omdbService.searchMovie(term, 3).pipe(
              map(res => res.Search),
              tap(res => {
                this.searchFailed = !res;
              }),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              })
            )
      ),
      tap(() => (this.searching = false))
    );

  onSelectItem = (e: any) => {
    this.searchItem = e.item;
    this.subscriptions.add(
      this.omdbService.get(this.searchItem.imdbID).subscribe(data => {
        this.movie = this.mapperService.mapToMovie(data);
      })
    );
  };

  onAddMovie() {
    this.movieService.add(this.movie).subscribe(data => {
      this.router.navigate(['admin/movie']);
    });
  }
}
