import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ScheduleAddComponent } from './schedule-add.component';
import { MovieDetailComponent } from 'src/app/@shared/components/movie-detail/movie-detail.component';
import { Branch } from 'src/app/@core/models/Branch';
import { Cinema } from 'src/app/@core/models/Cinema';
import { Movie } from 'src/app/@core/models/Movie';

describe('ScheduleAddComponent', () => {
  let component: ScheduleAddComponent;
  let fixture: ComponentFixture<ScheduleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleAddComponent, MovieDetailComponent ],
      imports: [FormsModule, NgbModule, RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAddComponent);
    component = fixture.componentInstance;
    component.branch = new Branch();
    component.cinema = new Cinema();
    component.movie = new Movie();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
