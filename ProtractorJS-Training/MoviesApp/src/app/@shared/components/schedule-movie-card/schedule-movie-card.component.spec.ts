import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCardComponent } from './schedule-movie-card.component';
import { Schedule } from 'src/app/@core/models/Schedule';
import { Movie } from 'src/app/@core/models/Movie';

describe('ScheduleCardComponent', () => {
  let component: ScheduleCardComponent;
  let fixture: ComponentFixture<ScheduleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCardComponent);
    component = fixture.componentInstance;
    component.movie = new Movie();
    component.schedule = new Schedule();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
