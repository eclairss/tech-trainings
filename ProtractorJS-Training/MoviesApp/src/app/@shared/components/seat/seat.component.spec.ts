import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SeatComponent } from './seat.component';
import { Seat } from 'src/app/@core/models/Seat';

describe('SeatComponent', () => {
  let component: SeatComponent;
  let fixture: ComponentFixture<SeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatComponent);
    component = fixture.componentInstance;
    component.seat = new Seat();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
