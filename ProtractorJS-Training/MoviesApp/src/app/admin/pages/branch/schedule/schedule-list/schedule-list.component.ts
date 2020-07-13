import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { CinemaService } from 'src/app/@core/services/cinema.service';
import { MovieService } from 'src/app/@core/services/movie.service';
import { ScheduleService } from 'src/app/@core/services/schedule.service';
import { Schedule } from 'src/app/@core/models/Schedule';
import { Cinema } from 'src/app/@core/models/Cinema';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit, OnDestroy {
  cinemas$: Observable<Cinema[]>;
  schedules: Schedule[];
  movies: Movie[];
  branchId: number;
  cinema: Cinema;
  subscriptions: Subscription;
  itemsPerPage: number;
  page: number;
  sort: string;
  order: string;
  totalCount: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cinemaService: CinemaService,
    private movieService: MovieService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.branchId = +this.route.snapshot.params['id'];
    this.itemsPerPage = 6;
    this.page = 1;
    this.sort = 'startDate';
    this.order = 'asc';
    this.schedules = [];
    this.movies = [];
    this.getPagedSchedules();
    this.getCinemas();
    this.getMovies();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClickAdd() {
    this.router.navigate(['admin', 'branch', this.branchId, 'schedule', 'add']);
  }

  onClickDelete(schedule: Schedule) {
    this.subscriptions.add(
      this.scheduleService.delete(schedule.id).subscribe(data => {
        this.getPagedSchedules();
      })
    );
  }

  onCinemaChanged(event: any) {
    this.getPagedSchedules();
  }

  getMovies() {
    this.subscriptions.add(
      this.movieService.getAll().subscribe(data => {
        this.movies = data;
      })
    );
  }

  getScheduleMovie(schedule: Schedule) {
    return this.movies.find(m => m.id === schedule.movieId);
  }

  getPagedSchedules() {
    const start = this.itemsPerPage * this.page - this.itemsPerPage;
    const end = this.itemsPerPage * this.page;
    if (this.cinema) {
      this.subscriptions.add(
        this.scheduleService.getPagedListByCinema(
          this.cinema.id,
          start,
          end,
          this.sort,
          this.order
        ).subscribe(data => {
          this.schedules = data.list;
          this.totalCount = data.totalCount;
        })
      );
    } else {
      this.subscriptions.add(
        this.scheduleService.getPagedListByBranch(
          this.branchId,
          start,
          end,
          this.sort,
          this.order
        ).subscribe(data => {
          this.schedules = data.list;
          this.totalCount = data.totalCount;
        })
      );
    }
  }

  getCinemas() {
    this.cinemas$ = this.cinemaService.getAllByBranch(this.branchId);
  }

  onItemsPerPageChanged(event: any) {
    this.getPagedSchedules();
  }

  onChangePage(page) {
    this.page = page;
    this.getPagedSchedules();
  }
}
