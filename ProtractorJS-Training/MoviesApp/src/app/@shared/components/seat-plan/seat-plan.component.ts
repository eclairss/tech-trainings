import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Cinema } from 'src/app/@core/models/Cinema';
import { CinemaSeatPlan } from 'src/app/@core/models/CinemaSeatPlan';
import { Seat } from 'src/app/@core/models/Seat';

@Component({
  selector: 'app-seat-plan',
  templateUrl: './seat-plan.component.html',
  styleUrls: ['./seat-plan.component.css']
})
export class SeatPlanComponent implements OnInit, OnChanges {
  @Input()
  forceChange: number = 0;
  @Input()
  enableRowCol: boolean;
  @Input()
  cinema: Cinema;
  @Input()
  cinemaSeatPlan: CinemaSeatPlan;
  @ViewChild('seatPlan', { static: false })
  seatPlan: ElementRef;
  @Output()
  cinemaSeatPlanChangeEvent = new EventEmitter<CinemaSeatPlan>();
  @Output()
  seatClickEvent = new EventEmitter<Seat>();

  constructor() {}

  ngOnInit() {
    this.renderSeatPlan();
  }

  ngOnChanges() {
    this.renderSeatPlan();
  }

  onChangeRows() {
    this.cinemaSeatPlanChangeEvent.emit(this.cinemaSeatPlan);
  }

  onChangeColumns() {
    this.cinemaSeatPlanChangeEvent.emit(this.cinemaSeatPlan);
  }

  onClickSeat(seat: Seat) {
    this.seatClickEvent.emit(seat);
  }

  renderSeatPlan() {
    if (this.seatPlan) {
      if (this.cinemaSeatPlan.rows && this.cinemaSeatPlan.columns) {
        this.seatPlan.nativeElement.style.gridTemplateRows = '5vh '.repeat(
          this.cinemaSeatPlan.rows
        );
        this.seatPlan.nativeElement.style.gridTemplateColumns = '5vh '.repeat(
          this.cinemaSeatPlan.columns
        );
      }
    }
  }
}
