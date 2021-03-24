import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MyPackage } from '../object/MyPackage';
import { ProductPackage } from '../object/ProductPackage';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  faLeft = faChevronLeft;
  faClose = faTimes;

  showCart = false;
  ready = false;

  totalPrice: number = 1000;

  listProduct: MyPackage[] = [];

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.GetMyPackage(result => {
      this.listProduct = result;
      this.getTotalPrice();
      this.ready = true;
    });
  }

  getTotalPrice() {
    this.totalPrice = this.listProduct.reduce((t, x) => t + x.number_unit * x.beerSubmitData.listUnit[0].price * (100 - x.beerSubmitData.listUnit[0].discount) / 100, 0);
    this.showCart = this.listProduct.length != 0;
  }

  changeNumber(increase: boolean, currentBeer: MyPackage) {
    if (!increase) {
      if (currentBeer.number_unit > 1) {
        this.addToPackage(-1, currentBeer);
      }
    } else {
      this.addToPackage(1, currentBeer);
    }
  }

  setNumber(count: string, currentBeer: MyPackage) {
    const countInt: number = Number(count);
    if (countInt > 0) {
      this.addToPackage(countInt - currentBeer.number_unit, currentBeer);
    }
  }

  addToPackage(diff: number, currentBeer: MyPackage) {
    if (currentBeer.processing)
      return;
    currentBeer.processing = true;
    let packageItem: ProductPackage = {
      deviceID: '',
      beerID: currentBeer.beer_id,
      beerUnits: [
        {
          beerUnitID: currentBeer.beerSubmitData.listUnit[0].beer_unit_second_id,
          numberUnit: diff
        }
      ]
    }
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

  deleteItem(myPackage: MyPackage) {
    this.api.DeleteProductFromPackage(myPackage, result => {
      if (result) {
        this.listProduct.forEach((item, index) => {
          if (item === myPackage) this.listProduct.splice(index, 1);
        });
        this.getTotalPrice();
      }
    });
  }
}
