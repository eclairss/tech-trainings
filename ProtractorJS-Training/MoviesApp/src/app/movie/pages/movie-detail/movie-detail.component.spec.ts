import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogModule } from 'primeng/dialog';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatOptionModule,
  MatRippleModule
} from '@angular/material';
import { ReservationSummaryComponent } from 'src/app/@shared/components/reservation-summary/reservation-summary.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailComponent as MDC } from 'src/app/@shared/components/movie-detail/movie-detail.component';
import { SeatPlanComponent } from 'src/app/@shared/components/seat-plan/seat-plan.component';
import { SeatComponent } from 'src/app/@shared/components/seat/seat.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieDetailComponent,
        MovieDetailComponent,
        SeatPlanComponent,
        SeatComponent,
        ReservationSummaryComponent,
        MDC
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        DialogModule,
        OverlayModule,
        MatSelectModule,
        MatFormFieldModule,
        MatOptionModule,
        MatRippleModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
