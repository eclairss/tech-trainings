import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import {
  filter,
  map,
  tap,
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { MovieService } from 'src/app/@core/services/movie.service';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  searchItem: Movie;
  movies: Movie[];
  searching: boolean;
  searchFailed: boolean;
  subscriptions: Subscription;
  itemsPerPage: number;
  page: number;
  totalCount: number;

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.movies = [];
    this.searchItem = new Movie();
    this.searchItem.Title = '';
    this.itemsPerPage = 3;
    this.page = 1;
    this.getPagedMovies();
  }

  ngOnDestroy() {}

  onClickAdd() {
    this.router.navigate(['admin/movie/add']);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        term.length < 2
          ? of([])
          : this.movieService.getPagedList(term).pipe(
              map(res => {
                this.searchFailed = !res.list || !res.list.length;
                return res.list;
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
    this.router.navigate(['admin/movie', this.searchItem.id]);
  };

  getPagedMovies() {
    const start = this.itemsPerPage * this.page - this.itemsPerPage;
    const end = this.itemsPerPage * this.page;
    this.subscriptions.add(
      this.movieService.getPagedList('', start, end).subscribe(data => {
        this.movies = data.list;
        this.totalCount = data.totalCount;
      })
    );
  }

  onItemsPerPageChanged(event: any) {
    this.getPagedMovies();
  }

  onChangePage(page) {
    this.page = page;
    this.getPagedMovies();
  }

  viewTrailerClickEvent(movie: Movie) {
    const trailerUrl = this.movieService.getTrailerUrl(movie.imdbID);

    window.open(trailerUrl, '_blank');
  }

  getTicket(movie: Movie) {
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }
}
