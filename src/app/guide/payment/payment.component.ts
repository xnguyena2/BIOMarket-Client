import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private appServices: AppService,) {
    this.appServices.changeScrollToTop(true);
  }

  ngOnInit(): void {
  }

}
