import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSummaryComponent } from './reservation-summary.component';
import { Branch } from 'src/app/@core/models/Branch';
import { Cinema } from 'src/app/@core/models/Cinema';
import { Movie } from 'src/app/@core/models/Movie';
import { Reservation } from 'src/app/@core/models/Reservation';
import { Schedule } from 'src/app/@core/models/Schedule';

describe('ReservationSummaryComponent', () => {
  let component: ReservationSummaryComponent;
  let fixture: ComponentFixture<ReservationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSummaryComponent);
    component = fixture.componentInstance;
    component.branch = new Branch();
    component.cinema = new Cinema();
    component.movie = new Movie();
    component.reservation = new Reservation();
    component.reservation.seats = [];
    component.schedule = new Schedule();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
