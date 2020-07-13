import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SeatPlanComponent } from './seat-plan.component';
import { Cinema } from 'src/app/@core/models/Cinema';
import { CinemaSeatPlan } from 'src/app/@core/models/CinemaSeatPlan';
import { Seat } from 'src/app/@core/models/Seat';
import { SeatComponent } from '../seat/seat.component';

describe('SeatPlanComponent', () => {
  let component: SeatPlanComponent;
  let fixture: ComponentFixture<SeatPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatPlanComponent, SeatComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatPlanComponent);
    component = fixture.componentInstance;
    component.cinema = new Cinema();
    component.cinemaSeatPlan = new CinemaSeatPlan();
    component.cinemaSeatPlan.seats = [new Seat()];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
