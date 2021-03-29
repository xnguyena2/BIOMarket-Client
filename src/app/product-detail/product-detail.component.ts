import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CarouselPaddingComponent } from '../carousel-padding/carousel-padding.component';
import { BeerDetail, BeerUnit } from '../object/BeerDetail';
import { ProductPackage } from '../object/ProductPackage';
import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(CarouselPaddingComponent) private carousel!: CarouselPaddingComponent;

  faCaretDown = faCaretDown;

  faClose = faTimes;

  hideActionID: string = '';

  productReady: boolean = false;
  title: string = '';
  price: number = 0;
  realPrice: number = 0;
  discount: number = 0;
  listUnit: BeerUnit[] = [];
  fullscreenMode: boolean = false;
  productID: string = '';
  productUnitID: string = '';
  productUnitTitle: string = '';
  productPreviewImg: string = '';

  showAddCartPopup: boolean = false;

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
              this.productDetail = product.detail;
              this.productID = product.beerSecondID;
              if (product.images != null && product.images.length > 0) {
                this.productPreviewImg = product.images[0].medium;
              } else {
                this.productPreviewImg = '';
              }
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
      this.productUnitID = currentUnit.beer_unit_second_id;
      this.productUnitTitle = currentUnit.name;
      this.realPrice = currentUnit.price;
      this.discount = currentUnit.discount;
      this.price = this.realPrice * (100 - this.discount) / 100;
    }
  }


  clickAt(index: number) {
    if (!this.fullscreenMode) {
      this.fullscreenMode = true;
      this.changeScroll(false);
    }
  }

  hidePopUp(mouse: MouseEvent) {
    console.log(mouse);

    if (mouse.target !== mouse.currentTarget) {
      return;
    }
    this.fullscreenMode = false;
    this.changeScroll(true);
  }

  changeScroll(isEnable: boolean) {
    if (isEnable) {
      document.getElementById('main-body')?.classList.remove('disable-scroll');
    } else {
      document.getElementById('main-body')?.classList.add('disable-scroll');
    }
  }

  changeNumberSell(isIncrease: boolean) {
    if (isIncrease) {
      this.productCount++;
    } else {
      if (this.productCount > 1) {
        this.productCount--;
      }
    }
  }

  onChangeNumber(value: string) {
    const num = Number(value);
    if (num > 0) {
      this.productCount = num;
    } else {
      this.productCount = 1;
    }
  }

  addToPackage(gotoCart: boolean) {
    let packageItem: ProductPackage = {
      deviceID: '',
      beerID: this.productID,
      beerUnits: [
        {
          beerUnitID: this.productUnitID,
          numberUnit: this.productCount
        }
      ]
    }
    this.Api.AddToPackage(packageItem, result => {
      if (result) {
        if(gotoCart){
          this.router.navigate(['checkouts']);
        }else{
          this.showSuccessPopUP();
        }
        this.Api.GetPackage();
      } else {

      }
    });
    //this.router.navigate(['cart']);
  }

  showSuccessPopUP() {
    this.showAddCartPopup = true;
    this.changeScroll(false);
    const currentActionID = this.Api.GenerateID();
    this.hideActionID = currentActionID;
    setTimeout(() => {
      if (this.hideActionID === currentActionID) {
        this.hideByingPopup();
      }
    }, 3000);
  }

  hideSuccessPopUP(mouse: MouseEvent) {
    if (mouse.target !== mouse.currentTarget) {
      return;
    }
    this.hideByingPopup();
  }

  hideByingPopup() {
    this.hideActionID = '';
    this.showAddCartPopup = false;
    this.changeScroll(true);
  }

  buyNow() {
    this.addToPackage(true);
  }
}
