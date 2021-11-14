import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselPaddingComponent } from '../carousel-padding/carousel-padding.component';
import { BeerDetail, BeerUnit } from '../object/BeerDetail';
import { ProductPackage } from '../object/ProductPackage';
import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

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
  fullscreenMode: boolean = false;
  productID: string = '';
  productUnitID: string = '';
  productUnitTitle: string = '';
  productPreviewImg: string = '';

  productDetailTitle: string = 'Chi Tiết Sản Phẩm';
  productRelateTitle: string = 'Sản Phẩm Liên Quan';

  sold_out: boolean = false;
  productSoldOut: boolean = false;

  currentUnitIndex: number = 0;


  productDetail: string = '';

  listProduct: BeerDetail[] = [];

  productCount: number = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Api: APIService,
    private App: AppService,) { }
  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        const productID = params.productID;
        this.productCount = 1;
        if (productID !== null) {
          console.log(productID);
          this.Api.SearchBeer(new SearchQuery('', 0, 8, ''), result => {
            if (result) {
              const totalList = result.result.filter(x => x.beerSecondID !== productID);
              this.Api.validListProduct(totalList);
              if (totalList.length > 4) {
                this.listProduct = totalList.slice(0, 4);
              } else {
                this.listProduct = totalList;
              }
            }
          });
          this.Api.GetProductDetail(productID, product => {
            if (product) {
              this.App.changeScrollToTop(true);
              if (product.images)
                this.carousel.setupListItem(product.images.map(x => x.large));
              else
                this.carousel.setupListItem(null);
              this.currentUnitIndex = product.validIndex;
              this.title = product.name;
              this.productDetailTitle = `Chi Tiết ${product.name}`;
              this.productRelateTitle = `Sản Phẩm Liên Quan ${product.name}`;
              this.listUnit = product.listUnit;
              this.productDetail = product.detail;
              this.productID = product.beerSecondID;
              this.App.changeTitlePage(product.name);
              this.App.changeTagPage(this.extractContent(product.detail));
              this.sold_out = this.productSoldOut = product.status === 'sold_out';
              if (!this.productSoldOut) {
                this.sold_out = product.listUnit[product.validIndex].status === 'sold_out';
              }
              this.changeUnit(this.listUnit[product.validIndex].beer_unit_second_id);
              if (product.images != null && product.images.length > 0) {
                this.productPreviewImg = product.images[0].medium;
              } else {
                this.productPreviewImg = '';
              }
              this.productReady = true;

              this.App.changeRichResult(product);
            } else {
              this.router.navigate(['/']);
            }
          });
        }
      }
    );
  }

  extractContent(html: string): string {

    if (this.App.isBrowser) {
      let content = new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
      if (content === null)
        return this.title;
      return content;

      // var t = document.createElement('div');
      // t.innerHTML = html;
      // let content = t.textContent;
      // if (content === null)
      //   return this.title;
      // return content;
    } else {
      return html.replace(/<[^>]+>/g, '');
    }
  }


  changeUnit(unitID: string) {
    let currentUnit: BeerUnit | undefined = this.listUnit.find(x => x.beer_unit_second_id === unitID);
    if (currentUnit) {
      this.productUnitID = currentUnit.beer_unit_second_id;
      this.productUnitTitle = currentUnit.name;
      this.realPrice = currentUnit.price;
      this.discount = currentUnit.discount;
      this.price = this.realPrice * (100 - this.discount) / 100;
      if (!this.productSoldOut) {
        this.sold_out = currentUnit.status === 'sold_out';
      }
    }
  }


  clickAt(index: number) {
    if (!this.fullscreenMode) {
      this.fullscreenMode = true;
      this.App.changeScrollChange(false);
    }
  }

  hidePopUp(mouse: MouseEvent) {
    //console.log(mouse);

    if (mouse.target !== mouse.currentTarget) {
      return;
    }
    this.fullscreenMode = false;
    this.App.changeScrollChange(true);
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
        if (gotoCart) {
          this.router.navigate(['checkouts']);
        } else {
          this.App.showSuccessProduct({
            name: this.title,
            img: this.productPreviewImg,
            title: this.productUnitTitle,
            price: this.price,
            count: this.productCount
          });
        }
        this.Api.GetPackage();
      } else {

      }
    });
    //this.router.navigate(['cart']);
  }

  buyNow() {
    this.addToPackage(true);
  }
}
