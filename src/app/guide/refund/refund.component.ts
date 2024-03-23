import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from '../../config/AppValue';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  storeName: string = 'Cửa hàng';
  constructor(
    private appServices: AppService,) {
    this.appServices.changeScrollToTop(true);
  }

  ngOnInit(): void {
    this.storeName = environment.storeName;
  }

}
