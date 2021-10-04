import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyproductComponent } from './buyproduct/buyproduct.component';
import { ContractComponent } from './contract/contract.component';

import { GuideComponent } from './guide.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { PaymentComponent } from './payment/payment.component';
import { RefundComponent } from './refund/refund.component';
import { ShippingComponent } from './shipping/shipping.component';

const routes: Routes = [
  {
    path: '',
    component: GuideComponent,
    children: [
      {
        path: 'buy',
        component: BuyproductComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'shipping',
        component: ShippingComponent,
      },
      {
        path: 'refund',
        component: RefundComponent,
      },
      {
        path: 'introduction',
        component: IntroductionComponent,
      },
      {
        path: 'contract',
        component: ContractComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }
