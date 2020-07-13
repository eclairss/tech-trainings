import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ScheduleListComponent } from './schedule-list.component';
import { Cinema } from 'src/app/@core/models/Cinema';
import { ScheduleCardComponent } from '../schedule-card/schedule-card.component';

describe('ScheduleListComponent', () => {
  let component: ScheduleListComponent;
  let fixture: ComponentFixture<ScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleListComponent, ScheduleCardComponent],
      imports: [
        FormsModule,
        NgbModule,
        RouterTestingModule,
        NgxPaginationModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListComponent);
    component = fixture.componentInstance;
    component.cinema = new Cinema();
    component.movies = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
