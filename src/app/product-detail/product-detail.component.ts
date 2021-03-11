import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselPaddingComponent } from '../carousel-padding/carousel-padding.component';
import { BeerUnit } from '../object/BeerDetail';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(CarouselPaddingComponent) private carousel!: CarouselPaddingComponent;

  productReady: boolean = false;
  title: string = '';
  price: number = 0;
  realPrice: number = 0;
  discount: number = 0;
  listUnit: BeerUnit[] = [];

  constructor(private route: ActivatedRoute,
    private Api: APIService,) { }
  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        const productID = params.productID;
        if (productID !== null) {
          console.log(productID);
          this.Api.GetProductDetail(productID, product => {
            if (product) {
              if (product.images)
                this.carousel.setupListItem(product.images.map(x => x.medium));
              else
                this.carousel.setupListItem(null);
              this.title = product.name;
              this.listUnit = product.listUnit;
              this.changeeUnit(this.listUnit[0].beer_unit_second_id);
              this.productReady = true;
            }
          });
        }
      }
    );
  }


  changeeUnit(unitID: string) {
    let currentUnit: BeerUnit | undefined = this.listUnit.find(x => x.beer_unit_second_id === unitID);
    if (currentUnit) {
      this.realPrice = currentUnit.price;
      this.discount = currentUnit.discount;
      this.price = this.realPrice * (100 - this.discount) / 100;
    }
  }
}
