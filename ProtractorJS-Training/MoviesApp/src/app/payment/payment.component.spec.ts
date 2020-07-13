import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputMaskModule } from 'primeng/inputmask';

import { PaymentComponent } from './payment.component';
import { PaymentSummaryComponent } from './pages/payment-summary/payment-summary.component';
import { DialogModule } from 'primeng/dialog';
import { ReservationSummaryComponent } from '../@shared/components/reservation-summary/reservation-summary.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent, PaymentSummaryComponent, ReservationSummaryComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        InputMaskModule,
        DialogModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
