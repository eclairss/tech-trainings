import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from 'src/app/@core/models/Reservation';
import { Cinema } from 'src/app/@core/models/Cinema';
import { Branch } from 'src/app/@core/models/Branch';
import { Schedule } from 'src/app/@core/models/Schedule';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  @Input()
  reservation: Reservation;
  @Input()
  branch: Branch;
  @Input()
  cinema: Cinema;
  @Input()
  movie: Movie;
  @Input()
  schedule: Schedule;


  constructor() { }

  ngOnInit() {
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
}
