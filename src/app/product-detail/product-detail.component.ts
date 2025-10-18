import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselPaddingComponent } from '../carousel-padding/carousel-padding.component';
import { BeerSubmitData, BeerUnit } from '../object/BeerDetail';
import { ProductPackage } from '../object/ProductPackage';
import { SearchQuery } from '../object/SearchQuery';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { UserPackage } from '../object/MyPackage';
import { environment } from '../config/AppValue';
import { BootStrap } from '../object/BootStrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(CarouselPaddingComponent) private carousel!: CarouselPaddingComponent;


  @Input() bootStrapConfig: Promise<BootStrap> = new Promise<BootStrap>
    ((resolve, reject) => { });

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
  inventoryNumber: number = 0;
  soldOut: boolean = false;


  productDetail: string = '';

  listProduct: BeerSubmitData[] = [];

  productCount: number = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Api: APIService,
    private App: AppService,) { }

  ngOnInit(): void {

    this.bootStrapConfig.then(bootStrap => {
      if (bootStrap) {
        this.route.params.subscribe(
          params => {
            const productID = params.productID;
            this.productCount = 1;
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
                  this.App.changeScrollToTop(true);
                  if (product.images)
                    this.carousel.setupListItem(product.images.map(x => x.large));
                  else
                    this.carousel.setupListItem(null);
                  this.title = product.name;
                  this.listUnit = product.listUnit;
                  this.changeUnit(this.listUnit[0].beer_unit_second_id);
                  this.productDetail = (product.detail ?? '').replace('\n', '<br/>');
                  this.productID = product.beerSecondID;
                  if (product.images != null && product.images.length > 0) {
                    this.productPreviewImg = product.images[0].medium;
                  } else {
                    this.productPreviewImg = '';
                  }
                  this.productReady = true;
                } else {
                  this.router.navigate(['/']);
                }
              });
            }
          }
        );
      }
    });
  }


  changeUnit(unitID: string) {
    let currentUnit: BeerUnit | undefined = this.listUnit.find(x => x.beer_unit_second_id === unitID);
    if (currentUnit) {
      this.productUnitID = currentUnit.beer_unit_second_id;
      this.productUnitTitle = currentUnit.name;
      this.realPrice = currentUnit.price;
      this.discount = BeerUnit.getDiscountPercent(currentUnit);
      this.price = BeerUnit.getPrice(currentUnit);
      this.inventoryNumber = currentUnit.inventory_number;
      this.soldOut = this.inventoryNumber <= 0;
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
    if (this.soldOut) {
      return;
    }
    let packageItem: ProductPackage = new ProductPackage(environment.packageID,
      undefined, [
      new UserPackage(
        this.productID,
        this.productUnitID,
        this.productCount,
      )
    ]
    )
    this.Api.AddToPackage(packageItem, result => {
      if (result) {
        if (gotoCart) {
          this.router.navigate(['checkouts']);
        } else {
          this.App.showSuccessProduct({
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
    if (this.soldOut) {
      return;
    }
    this.addToPackage(true);
  }
}
