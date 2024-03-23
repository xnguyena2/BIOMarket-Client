import { Component, OnInit } from '@angular/core';
import { ProductInPackageResponse, PackageDataResponse, UserPackage, Buyer } from '../object/MyPackage';
import { ProductPackage } from '../object/ProductPackage';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  showCart = false;
  ready = false;

  totalPrice: number = 1000;

  myPackage: PackageDataResponse = new PackageDataResponse();

  constructor(private api: APIService,
    private appServices: AppService,) { }

  ngOnInit(): void {
    this.api.GetMyPackage(result => {
      this.myPackage = result;
      this.getTotalPrice();
      this.ready = true;
      this.appServices.changeScrollToTop(true);
    });
  }

  getTotalPrice() {
    this.totalPrice = PackageDataResponse.getPrice(this.myPackage);
    this.showCart = PackageDataResponse.getCartNo(this.myPackage) != 0;
  }

  changeNumber(increase: boolean, currentBeer: ProductInPackageResponse) {
    if (!increase) {
      if (currentBeer.number_unit > 1) {
        this.addToPackage(-1, currentBeer);
      }
    } else {
      this.addToPackage(1, currentBeer);
    }
  }

  setNumber(count: string, currentBeer: ProductInPackageResponse) {
    const countInt: number = Number(count);
    if (countInt > 0) {
      this.addToPackage(countInt - currentBeer.number_unit, currentBeer);
    }
  }

  addToPackage(diff: number, currentBeer: ProductInPackageResponse) {
    if (currentBeer.processing)
      return;
    currentBeer.processing = true;
    let packageItem: ProductPackage = new ProductPackage(this.myPackage.package_second_id,
      undefined, [
      new UserPackage(
        currentBeer.beerSubmitData.beerSecondID,
        currentBeer.beerSubmitData.listUnit[0].beer_unit_second_id,
        diff,
      )
    ]
    );
    this.api.AddToPackage(packageItem, result => {
      if (result) {
        currentBeer.number_unit += diff;
        this.getTotalPrice();
      } else {
      }
      currentBeer.processing = false;
    });
    //this.router.navigate(['cart']);
  }

  deleteItem(myItem: ProductInPackageResponse) {
    this.api.DeleteProductFromPackage(myItem, result => {
      if (result) {
        this.myPackage.items.forEach((item, index) => {
          if (item === myItem) this.myPackage.items.splice(index, 1);
        });
        this.getTotalPrice();
      }
    });
  }
}
