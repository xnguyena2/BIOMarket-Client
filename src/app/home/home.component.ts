import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselPaddingComponent } from '../carousel-padding/carousel-padding.component';
import { BeerDetail } from '../object/BeerDetail';

import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(CarouselPaddingComponent) private carousel!: CarouselPaddingComponent;

  listProduct: BeerDetail[] = [];

  constructor(private API: APIService,
    public AppService: AppService) { }

  ngOnInit(): void {
    this.API.LoadBootStrap(result => {
      if (result) {
        if( result.carousel && result.carousel.length>0){
          this.carousel.setupListItem(result.carousel);
        };
        this.listProduct = result.products;
      }
    });
  }
}
