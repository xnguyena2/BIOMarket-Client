import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CarouselPaddingComponent } from '../carousel-padding/carousel-padding.component';
import { BeerDetail, BeerUnit } from '../object/BeerDetail';
import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(CarouselPaddingComponent) private carousel!: CarouselPaddingComponent;

  faClose = faTimes;

  productReady: boolean = false;
  title: string = '';
  price: number = 0;
  realPrice: number = 0;
  discount: number = 0;
  listUnit: BeerUnit[] = [];
  fullscreenMode: boolean = false;

  productDetail: string = '';

  listProduct: BeerDetail[] = [];

  productCount: number = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private scroll: ViewportScroller,
    private Api: APIService,) { }
  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        const productID = params.productID;
        if (productID !== null) {
          console.log(productID);
          this.Api.SearchBeer(new SearchQuery('', 0, 8, ''), result => {
            if (result) {
              const totalList = result.result.filter(x => x.beerSecondID !== productID);
              if (totalList.length > 4) {
                this.listProduct = totalList.slice(0, 4);
              } else {
                this.listProduct = totalList;
              }
            }
          });
          this.Api.GetProductDetail(productID, product => {
            if (product) {
              this.scroll.scrollToPosition([0, 0]);
              if (product.images)
                this.carousel.setupListItem(product.images.map(x => x.large));
              else
                this.carousel.setupListItem(null);
              this.title = product.name;
              this.listUnit = product.listUnit;
              this.changeeUnit(this.listUnit[0].beer_unit_second_id);
              this.productReady = true;
              this.productDetail = product.detail;
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


  clickAt(index: number) {
    if (!this.fullscreenMode) {
      this.fullscreenMode = true;
    }
  }

  hidePopUp(mouse: any) {
    if (mouse.target.className === 'gallery-full-screen') {
      this.fullscreenMode = false;
    }
  }

  changeNumberSell(isIncrease: boolean){
    if(isIncrease){
      this.productCount++;
    }else{
      if(this.productCount>1){
        this.productCount--;
      }
    }
  }

  addToPackage(){
    this.router.navigate(['cart']);

  }

  buyNow(){

  }
}
