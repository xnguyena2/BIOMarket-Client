import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';
import { BuyproductComponent } from './buyproduct/buyproduct.component';
import { PaymentComponent } from './payment/payment.component';
import { ShippingComponent } from './shipping/shipping.component';
import { RefundComponent } from './refund/refund.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ContractComponent } from './contract/contract.component';


@NgModule({
  declarations: [GuideComponent, BuyproductComponent, PaymentComponent, ShippingComponent, RefundComponent, IntroductionComponent, ContractComponent],
  imports: [
    CommonModule,
    GuideRoutingModule
  ]
})
export class GuideModule { }
