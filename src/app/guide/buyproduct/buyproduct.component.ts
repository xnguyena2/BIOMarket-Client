import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/config/AppValue';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.scss']
})
export class BuyproductComponent implements OnInit {

  storePhone: string = '';
  storeURL: string = '';

  constructor(
    private appServices: AppService,) {
    this.appServices.changeScrollToTop(true);
  }

  ngOnInit(): void {
    this.storePhone = environment.storePhone;
    this.storeURL = 'https://' + this.storePhone + '.sodientu.com/'
  }

}
