import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { PaymentService } from 'src/app/@core/services/payment.service';
import { UserService } from 'src/app/@core/services/user.service';
import { User } from 'src/app/@core/models/User';
import { Payment } from 'src/app/@core/models/Payment';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit, OnDestroy {
  payment: Payment;
  user: User;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = new Subscription();
    this.getPayment();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPayment() {
    const paymentId = +this.route.snapshot.params['id'];
    this.subscription.add(
      this.paymentService.get(paymentId).subscribe(data => {
        this.payment = data;

        if (this.payment.userId) {
          this.getUser(this.payment.userId);
        }
      })
    );
  }

  getUser(userId) {
    this.subscription.add(
      this.userService.get(userId).subscribe(data => {
        this.user = data;
      })
    );
  }

  momentFormat(date: any, format: string) {
    const mDate = moment(date);

    return mDate.format(format);
  }
}
