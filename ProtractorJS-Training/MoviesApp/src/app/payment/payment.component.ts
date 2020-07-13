import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of, throwError, forkJoin } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';
import * as moment from 'moment';

import { PaymentService } from 'src/app/@core/services/payment.service';
import { ReservationService } from 'src/app/@core/services/reservation.service';
import { MovieService } from 'src/app/@core/services/movie.service';
import { CinemaService } from 'src/app/@core/services/cinema.service';
import { BranchService } from 'src/app/@core/services/branch.service';
import { ScheduleService } from 'src/app/@core/services/schedule.service';
import { UserService } from 'src/app/@core/services/user.service';
import { Payment } from 'src/app/@core/models/Payment';
import { Reservation } from 'src/app/@core/models/Reservation';
import { Movie } from 'src/app/@core/models/Movie';
import { Branch } from 'src/app/@core/models/Branch';
import { Cinema } from 'src/app/@core/models/Cinema';
import { Schedule } from 'src/app/@core/models/Schedule';
import { User } from 'src/app/@core/models/User';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;
  paymentForm: FormGroup;
  payment: Payment;
  reservation: Reservation;
  branch: Branch;
  cinema: Cinema;
  movie: Movie;
  schedule: Schedule;
  user: User;
  isProcessing = false;
  isDisplayConfirm = false;
  isValidReservation = false;
  initializedPayment = false;

  invalidDataText = 'Invalid reservation data';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private reservationService: ReservationService,
    private branchService: BranchService,
    private cinemaService: CinemaService,
    private movieService: MovieService,
    private scheduleService: ScheduleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.createForm();
    this.getUser();
    this.getReservationInfo();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createForm() {
    this.paymentForm = this.fb.group({
      cardholderName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]]
    });
  }

  getUser() {
    this.subscriptions.add(
      this.userService.user$.subscribe(data => {
        this.user = data;
      })
    );
  }

  getReservationInfo() {
    this.subscriptions.add(
      this.reservationService.reservation$.pipe(
        mergeMap(data => {
          if (!this.isValidReservationInfo(data)) {
            return throwError(this.invalidDataText);
          }

          const branch = this.cinemaService.get(data.cinemaId).pipe(
            mergeMap(cinemaData => {
              this.cinema = cinemaData;
              return this.branchService.get(cinemaData.branchId);
            })
          );

          const schedule = this.scheduleService.get(data.scheduleId);
          const movie = this.movieService.get(data.movieId);

          return forkJoin([
            of(data),
            schedule,
            branch,
            movie
          ]);
        })
      ).subscribe(([reservationData, scheduleData, branchData, movieData]) => {
        this.reservation = reservationData;
        this.schedule = scheduleData;
        this.branch = branchData;
        this.movie = movieData;
        this.initializeReservation();
      }, error => {
        if (error === this.invalidDataText) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }

  isValidReservationInfo(reservation: Reservation) {
    if (reservation.cinemaId &&
        reservation.movieId &&
        reservation.scheduleId &&
        reservation.seats.length > 0) {
          this.isValidReservation = true;
          return true;
        }
    return false;
  }

  initializeReservation() {
    this.payment = new Payment();
    this.payment.transactionDate = new Date();
    this.payment.description = `${this.movie.Title} | ${this.branch.name} | ${
      this.cinema.name
    } | ${this.momentFormat(this.schedule.startDate, 'MM/DD/YYYY hh:mm a')} | ${this.getSeatText()}`;
    this.payment.amount = this.reservation.totalAmount;

    if (this.user) {
      this.payment.userId = this.user.id;
    }
    this.initializedPayment = true;
  }

  getSeatText() {
    let seatTexts = '';
    this.reservation.seats.forEach(seat => {
      if (seatTexts !== '') {
        seatTexts += ', ';
      }
      seatTexts += seat.text;
    });
    return seatTexts;
  }

  momentFormat(date: any, format: string) {
    const mDate = moment(date);

    return mDate.format(format);
  }

  onConfirm() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    const value = this.paymentForm.value;

    this.payment.cardholderName = value.cardholderName;
    this.payment.creditCardNo = value.cardNumber;
    this.payment.cvv = value.cvv;
    this.payment.expiryDate = value.expiryDate;

    this.subscriptions.add(
      this.paymentService.add(this.payment).pipe(
        mergeMap(paymentData => {
          this.reservation.paymentId = paymentData.id;
          return this.reservationService.add(this.reservation);
        })
      ).subscribe(() => {
        setTimeout(() => {
          this.isDisplayConfirm = false;

          setTimeout(() => {
            this.isDisplayConfirm = true;
            this.isProcessing = false;
          }, 500);
        }, 5000);
        this.isProcessing = true;
        this.isDisplayConfirm = true;
      })
    );
  }
}
