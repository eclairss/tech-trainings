import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/@core/services/movie.service';
import { BranchService } from 'src/app/@core/services/branch.service';
import { CinemaService } from 'src/app/@core/services/cinema.service';
import { ScheduleService } from 'src/app/@core/services/schedule.service';
import { Observable, Subscription } from 'rxjs';
import { Branch } from 'src/app/@core/models/Branch';
import { Cinema } from 'src/app/@core/models/Cinema';
import { Movie } from 'src/app/@core/models/Movie';
import { Schedule } from 'src/app/@core/models/Schedule';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit, OnDestroy {
  cinemas$: Observable<Cinema[]>;
  movies$: Observable<Movie[]>;
  subscriptions: Subscription;
  movieSchedule: Schedule;
  branch: Branch;
  cinema: Cinema;
  movie: Movie;
  startDate: any = {
    year: undefined,
    month: undefined,
    day: undefined
  };
  startTime: any = {
    hour: 0,
    minute: 0
  };
  ticketPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService,
    private cinemaService: CinemaService,
    private movieService: MovieService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.movieSchedule = new Schedule();
    this.getBranch();
    this.getMovies();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getBranch() {
    const branchId = +this.route.snapshot.params['id'];
    this.subscriptions.add(
      this.branchService.get(branchId).subscribe(data => {
        this.branch = data;
        this.getCinemas();
      })
    );
  }

  getCinemas() {
    this.cinemas$ = this.cinemaService.getAllByBranch(this.branch.id);
  }

  getMovies() {
    this.movies$ = this.movieService.getAll();
  }

  onSubmit() {
    this.movieSchedule.cinemaId = this.cinema.id;
    this.movieSchedule.movieId = this.movie.id;
    this.movieSchedule.startDate = new Date(
      this.startDate.year,
      this.startDate.month - 1,
      this.startDate.day,
      this.startTime.hour,
      this.startTime.minute
    );
    this.movieSchedule.ticketPrice = this.ticketPrice;
    this.subscriptions.add(
      this.scheduleService.add(this.movieSchedule).subscribe(data => {
        this.router.navigate(['admin', 'branch', this.branch.id, 'schedule']);
      })
    );
  }
}
