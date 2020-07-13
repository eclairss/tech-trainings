import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { Branch } from "../../../../app/@core/models/Branch";
import { Cinema } from "../../../../app/@core/models/Cinema";
import { CinemaSeatPlan } from "../../../../app/@core/models/CinemaSeatPlan";
import { Movie } from "../../../../app/@core/models/Movie";
import { Reservation } from "../../../../app/@core/models/Reservation";
import { Schedule } from "../../../../app/@core/models/Schedule";
import { Seat } from "../../../../app/@core/models/Seat";
import { AuthService } from "../../../../app/@core/services/auth.service";
import { BranchService } from "../../../../app/@core/services/branch.service";
import { CinemaSeatPlanService } from "../../../../app/@core/services/cinema-seat-plan.service";
import { CinemaService } from "../../../../app/@core/services/cinema.service";
import { MovieService } from "../../../../app/@core/services/movie.service";
import { ReservationService } from "../../../../app/@core/services/reservation.service";
import { ScheduleService } from "../../../../app/@core/services/schedule.service";

@Component({
  selector: "app-movie-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.css"],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  seatLegend: Seat[];
  branches: Branch[];
  cinemas: Cinema[];
  cinemaSchedules: Schedule[];
  cinemaScheduleDates: string[];
  cinemaScheduleTimes: any[];
  branch: Branch;
  cinema: Cinema;
  movie: Movie;
  reservation: Reservation;
  cinemaSeatPlan: CinemaSeatPlan;
  subscriptions: Subscription;

  reserveForm: FormGroup;
  noScheduleFound: boolean;
  displaySummary = false;
  display = false;
  displayLoginPrompt = false;

  selectedSchedule: Schedule;
  selectedSeats: Seat[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private branchService: BranchService,
    private cinemaService: CinemaService,
    private scheduleService: ScheduleService,
    private cinemaSeatPlanService: CinemaSeatPlanService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.selectedSeats = [];
    this.setSeatLegend();
    this.noScheduleFound = false;
    this.initializeForm();
    this.subscriptions = new Subscription();
    this.getMovie();
    this.getBranches();
  }

  setSeatLegend() {
    this.seatLegend = [];
    const seatAvailable = new Seat();
    seatAvailable.text = "Available";
    const seatTaken = new Seat();
    seatTaken.taken = true;
    seatTaken.text = "Taken";
    const seatSelected = new Seat();
    seatSelected.selected = true;
    seatSelected.text = "Selected";
    this.seatLegend.push(seatAvailable);
    this.seatLegend.push(seatTaken);
    this.seatLegend.push(seatSelected);
  }

  initializeForm() {
    this.reserveForm = this.fb.group({
      branchId: ["", Validators.required],
      cinemaId: ["", Validators.required],
      watchDate: ["", Validators.required],
      scheduleId: ["", Validators.required],
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onBranchChange() {
    const branchId = this.reserveForm.get("branchId").value;
    this.branch = this.branches.find((branch) => branch.id === branchId);
    this.getCinemas(branchId);

    this.resetFormField("cinemaId");
    this.resetFormField("watchDate");
    this.resetFormField("scheduleId");

    this.noScheduleFound = false;
  }

  onCinemaChange() {
    this.resetFormField("watchDate");
    this.resetFormField("scheduleId");

    const cinemaId = this.reserveForm.get("cinemaId").value;
    const movieId = this.movie.id;

    if (cinemaId && movieId) {
      this.getScheduleDates(cinemaId, movieId);
    }
  }

  onDateChange() {
    const cinemaId = this.reserveForm.get("cinemaId").value;
    const movieId = this.movie.id;
    const watchDate = this.reserveForm.get("watchDate").value;

    if (cinemaId === null || watchDate === null) {
      return;
    }

    this.cinemaScheduleTimes = this.cinemaSchedules
      .filter((value, index, self) => {
        const mDate = moment(value.startDate);

        if (mDate.format("YYYY-MM-DD") === watchDate) {
          return value;
        }
      })
      .sort();

    this.noScheduleFound = false;
  }

  onTimeChange() {
    if (this.reserveForm.valid) {
      const scheduleId = this.reserveForm.get("scheduleId").value;
      const cinemaId = this.reserveForm.get("cinemaId").value;
      this.getSchedule(scheduleId);
      this.getCinemaDetails(cinemaId);
    } else {
      this.resetSeatPlan();
    }
  }

  momentFormat(date: any, format: string) {
    const mDate = moment(date);

    return mDate.format(format);
  }

  seatClickEvent(seat: Seat) {
    if (this.reserveForm.invalid) {
      return;
    }
    if (seat.disabled) {
      return;
    }
    if (seat.taken) {
      // TODO: Use PrimeNG for the prompt
      console.log("This seat is taken!");
      return;
    }
    let isSelected = true;
    if (seat.selected) {
      this.selectedSeats = this.selectedSeats.filter((reserveSeat) => {
        return reserveSeat.row !== seat.row || reserveSeat.col !== seat.col;
      });
      isSelected = false;
    } else {
      this.selectedSeats.push(seat);
    }

    this.cinemaSeatPlan.seats
      .filter((s) => s.row === seat.row && s.col === seat.col)
      .forEach((s) => {
        s.selected = isSelected;
      });
  }

  getCinemaDetails(cinemaId: number) {
    this.subscriptions.add(
      this.cinemaService.get(cinemaId).subscribe((data) => {
        this.cinema = data;
        this.getCinemaSeatPlan(cinemaId);
      })
    );
  }

  getCinemaSeatPlan(cinemaId: number) {
    this.cinemaSeatPlan = new CinemaSeatPlan();
    this.subscriptions.add(
      this.cinemaSeatPlanService.getByCinema(cinemaId).subscribe((data) => {
        if (data) {
          this.cinemaSeatPlan = data;
          this.getReservations();
        }
      })
    );
  }

  getSchedule(scheduleId: number) {
    this.scheduleService.get(scheduleId).subscribe((data) => {
      this.selectedSchedule = data;
    });
  }

  getMovie() {
    const id = this.route.snapshot.params.id;
    this.subscriptions.add(
      this.movieService.get(id).subscribe((data) => {
        this.movie = data;
      })
    );
  }

  getReservations() {
    const scheduleDetail = new Schedule();
    scheduleDetail.movieId = this.movie.id;
    scheduleDetail.cinemaId = this.reserveForm.get("cinemaId").value;
    scheduleDetail.id = this.reserveForm.get("scheduleId").value;

    this.subscriptions.add(
      this.reservationService
        .getBySchedule(scheduleDetail)
        .subscribe((data) => {
          if (data) {
            const reservations = data;
            reservations.map((reservation) => {
              reservation.seats.map((rs) => {
                this.cinemaSeatPlan.seats
                  .filter((s) => s.row === rs.row && s.col === rs.col)
                  .forEach((s) => {
                    s.taken = true;
                  });
              });
            });
          }
        })
    );
  }

  getBranches() {
    this.subscriptions.add(
      this.branchService.getAll().subscribe((data) => {
        this.branches = data;
      })
    );
  }

  getCinemas(branchId: number) {
    this.subscriptions.add(
      this.cinemaService.getAllByBranch(branchId).subscribe((data) => {
        this.cinemas = data;
      })
    );
  }

  getScheduleDates(cinemaId: number, movieId: number) {
    this.subscriptions.add(
      this.scheduleService
        .getScheduleByMovieAndCinema(cinemaId, movieId, new Date())
        .subscribe((data) => {
          const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
          };
          this.cinemaSchedules = data;
          this.cinemaScheduleDates = data
            .map((r) => moment(r.startDate).format("YYYY-MM-DD"))
            .sort()
            .filter(distinct);

          this.noScheduleFound = !this.cinemaSchedules.length;
        })
    );
  }

  reserve(reserveForm: FormGroup) {
    if (!this.authService.isLoggedIn()) {
      this.showLogInPrompt();
    } else {
      if (reserveForm.valid) {
        // Proceed to payment.
        this.reservationService.updateReservation(this.reservation);
        this.router.navigateByUrl("/payment");
      }
    }
  }

  redirectNotLogged(isSignUp: boolean) {
    this.reservationService.updateReservation(this.reservation);
    if (isSignUp) {
      this.router.navigate(["/register"], {
        queryParams: { returnUrl: "/payment" },
      });
    } else {
      this.router.navigateByUrl("/payment");
    }
  }

  resetFormField(field: string) {
    this.reserveForm.get(field).reset();
  }

  resetScheduleList() {
    this.resetFormField("scheduleId");
  }

  resetSeatPlan() {
    this.cinemaSeatPlan = null;
  }

  showLogInPrompt() {
    this.displaySummary = false;
    this.displayLoginPrompt = true;
  }

  showDialog() {
    this.displaySummary = true;

    // Initialize reservation object
    if (this.reserveForm.valid) {
      this.reservation = new Reservation();
      this.reservation.seats = this.selectedSeats;
      this.reservation.scheduleId = this.reserveForm.get("scheduleId").value;
      this.reservation.cinemaId = this.reserveForm.get("cinemaId").value;
      this.reservation.movieId = this.movie.id;
      this.reservation.totalAmount =
        this.selectedSchedule.ticketPrice * this.selectedSeats.length;
    }
  }
}
