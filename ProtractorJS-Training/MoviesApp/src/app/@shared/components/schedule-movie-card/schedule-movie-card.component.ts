import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Schedule } from 'src/app/@core/models/Schedule';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-schedule-movie-card',
  templateUrl: './schedule-movie-card.component.html',
  styleUrls: ['./schedule-movie-card.component.css']
})
export class ScheduleCardComponent implements OnInit {
  @Input()
  schedule: Schedule;
  @Input()
  movie: Movie;

  @Output()
  viewTrailerClickEvent = new EventEmitter<Movie>();

  startDate: moment.Moment;

  constructor() { }

  ngOnInit() {
    this.startDate = moment(this.schedule.startDate);
  }

  onClickViewTrailer() {
    this.viewTrailerClickEvent.emit(this.movie);
  }
}
