import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CinemaEditComponent } from './cinema-edit.component';
import { SeatPlanComponent } from 'src/app/@shared/components/seat-plan/seat-plan.component';
import { SeatComponent } from 'src/app/@shared/components/seat/seat.component';

describe('CinemaEditComponent', () => {
  let component: CinemaEditComponent;
  let fixture: ComponentFixture<CinemaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CinemaEditComponent, SeatPlanComponent, SeatComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
