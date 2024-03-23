import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CarouselPaddingComponent } from '../carousel-padding/carousel-padding.component';
import { BeerSubmitData } from '../object/BeerDetail';

import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { LoaderService } from '../services/loader.service';
import { BootStrap } from '../object/BootStrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() bootStrapConfig: Promise<BootStrap> = new Promise<BootStrap>
    ((resolve, reject) => { });

  @ViewChild(CarouselPaddingComponent) private carousel!: CarouselPaddingComponent;

  listProduct: BeerSubmitData[] = [];

  constructor(private API: APIService,
    public AppService: AppService,
    public loader: LoaderService) { }

  ngOnInit(): void {
    this.bootStrapConfig.then(bootStrap => {
      if (bootStrap) {
        this.carousel.setupListItem(['assets/img/1.jpg', 'assets/img/2.jpg']);//(bootStrap.carousel);
        if (bootStrap.carousel && bootStrap.carousel.length > 0) {
          // this.carousel.setupListItem(['assets/img/1.jpg']);//(bootStrap.carousel);
        };
        this.listProduct = bootStrap.products;
      }
    })
  }
}
