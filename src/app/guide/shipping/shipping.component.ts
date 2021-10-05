import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  constructor(
    private appServices: AppService,) {
    this.appServices.changeScrollToTop(true);
  }

  ngOnInit(): void {
  }

}
