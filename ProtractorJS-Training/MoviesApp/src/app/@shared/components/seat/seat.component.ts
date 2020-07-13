import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/@core/models/Seat';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  @Input()
  seat: Seat;

  constructor() {}

  ngOnInit() {}
}
