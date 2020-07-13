import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Schedule } from 'src/app/@core/models/Schedule';
import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent implements OnInit {
  @Input()
  schedule: Schedule;
  @Input()
  movie: Movie;

  startDate: moment.Moment;

  constructor() { }

  ngOnInit() {
    this.startDate = moment(this.schedule.startDate);
  }

}
