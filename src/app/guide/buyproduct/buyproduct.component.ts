import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.scss']
})
export class BuyproductComponent implements OnInit {

  constructor(
    private appServices: AppService,) {
    this.appServices.changeScrollToTop(true);
  }

  ngOnInit(): void {
  }

}
