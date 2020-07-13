import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { SharedModule } from '../@shared/shared.module';
import { PaymentSummaryComponent } from './pages/payment-summary/payment-summary.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentSummaryComponent
  ],
  imports: [
    PaymentRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    InputMaskModule
  ]
})
export class PaymentModule { }
