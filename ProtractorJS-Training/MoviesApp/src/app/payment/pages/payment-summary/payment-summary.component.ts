import { Component, Input } from '@angular/core';
import { Payment } from 'src/app/@core/models/Payment';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent {
  @Input()
  payment: Payment;
  @Input()
  seatNos: string;

  constructor() {}
}
