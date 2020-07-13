import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { Movie } from 'src/app/@core/models/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input()
  movie: Movie;
  @Input()
  link: string;
  @Input()
  startDate: any;
  @Output()
  viewTrailerClickEvent = new EventEmitter<Movie>();
  @Output()
  getTicketClickEvent = new EventEmitter<Movie>();

  date: moment.Moment;  

  constructor() { }

  ngOnInit() {
    if (this.startDate) {
      this.date = moment(new Date(this.startDate));
    } else {
      this.date = moment();
    }
  }

  onClickViewTrailer() {
    this.viewTrailerClickEvent.emit(this.movie);
  }

  onGetTicket() {
    this.getTicketClickEvent.emit(this.movie);
  }
}
