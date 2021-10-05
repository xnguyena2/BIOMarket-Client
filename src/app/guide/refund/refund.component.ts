import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  constructor(
    private appServices: AppService,) {
    this.appServices.changeScrollToTop(true);
  }

  ngOnInit(): void {
  }

}
