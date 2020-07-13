import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { PaymentService } from 'src/app/@core/services/payment.service';
import { Payment } from 'src/app/@core/models/Payment';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PaymentListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;
  payments: Payment[];

  totalCount: number;
  itemsPerPage: number;
  page: number;

  transactionDate: Date;

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.transactionDate = new Date();
    this.payments = [];
    this.itemsPerPage = 10;
    this.page = 1;
    this.getPagedPayments();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getPagedPayments() {
    const start = this.itemsPerPage * this.page - this.itemsPerPage;
    const end = this.itemsPerPage * this.page;

    const tDate = moment(this.transactionDate).format('YYYY-MM-DD');
    console.log('tDate', tDate);
    this.subscriptions.add(
      this.paymentService.getPagedList(tDate, start, end).subscribe(data => {
        this.payments = data.list;
        this.totalCount = data.totalCount;
      })
    );
  }

  momentFormat(date: any, format: string) {
    const mDate = moment(date);

    return mDate.format(format);
  }

  onDateSelect() {
    this.getPagedPayments();
  }

  onItemsPerPageChanged(event: any) {
    this.getPagedPayments();
  }

  onChangePage(page) {
    this.page = page;
    this.getPagedPayments();
  }
}
