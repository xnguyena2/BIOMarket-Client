import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MyPackage } from '../object/MyPackage';
import { convertToProductOrder, PackageOrderData } from '../object/PackageOrderData';
import { District, Region, Ward } from '../object/Region';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent implements OnInit {

  cartIcon = faShoppingCart;
  faLeft = faChevronLeft;

  myRegion: Region[] = [];
  myDistrict: District[] = [];
  myWard: Ward[] = [];

  showCart = false;
  ready = false;

  totalPrice: number = 0;
  shipPrice: number = 0;
  allPrice: number = 0;

  listProduct: MyPackage[] = [];

  voucher: string = '';

  usingShipServices: boolean = true;

  curentRegionID: number = 0;
  curentDistrictID: number = 0;
  curentWardID: number = 0;

  fullName: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";

  constructor(private Api: APIService,
    private appServices: AppService,
    private router: Router,
    private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.Api.GetAllRegion(result => {
      this.myRegion = result;
    });
    this.Api.GetMyPackage(result => {
      this.listProduct = result;
      this.ready = true;
      this.scroll.scrollToPosition([0, 0]);
      this.getTotalPrice();
    });
  }

  getTotalPrice() {
    this.totalPrice = this.listProduct.reduce((t, x) => t + x.number_unit * x.beerSubmitData.listUnit[0].price * (100 - x.beerSubmitData.listUnit[0].discount) / 100, 0);
    this.allPrice = this.totalPrice + this.shipPrice;
    this.showCart = this.listProduct.length != 0;
  }

  changeRegion(region: string) {
    this.curentRegionID = Number(region);
    let currentRegion = this.myRegion.find(x => x.id === this.curentRegionID);
    if (currentRegion) {
      this.myDistrict = currentRegion.districts.data;
      this.myWard = [];
    }
  }

  changeDistrict(district: string) {
    this.curentDistrictID = Number(district);
    let currentDistrict = this.myDistrict.find(x => x.id === this.curentDistrictID);
    if (currentDistrict) {
      this.myWard = currentDistrict.wards.data;
      this.getPrice('', true);
    }
  }

  changeWard(ward: string) {
    if (ward === '')
      return;
    this.curentWardID = Number(ward);
    this.getPrice('', true);
  }

  changeShipProvider(value: boolean) {
    this.usingShipServices = value;
  }

  validSubmit(): boolean {
    if (this.fullName === '') {
      this.appServices.changeAlter("Tên người dùng không được trống!");
      return false;
    }
    if (this.phone === '') {
      this.appServices.changeAlter("Số điện thoại không được trống!");
      return false;
    }
    if (this.address === '') {
      this.appServices.changeAlter("Địa chỉ nhận hàng không được trống!");
      return false;
    }
    if (this.usingShipServices) {
      if (this.curentRegionID === 0) {
        this.appServices.changeAlter("Bạn phải chọn thành tỉnh/phố!");
        return false;
      }
      if (this.curentDistrictID === 0) {
        this.appServices.changeAlter("Bạn phải chọn quận/huyện!");
        return false;
      }
      if (this.curentWardID === 0) {
        this.appServices.changeAlter("Bạn phải chọn phường/xã!");
        return false;
      }
    } else {
      this.curentRegionID = 0;
    }
    return true;
  }

  useVoucher(voucher: string) {
    if (!this.validSubmit())
      return;
    this.voucher = voucher;
    this.getPrice(voucher, true);
  }

  createOrderer() {
    if (!this.validSubmit())
      return;
    this.getPrice(this.voucher, false);
  }

  getPrice(voucher: string, preOrderer: boolean) {
    const order: PackageOrderData = convertToProductOrder(this.listProduct, "", preOrderer, this.address, this.curentRegionID, this.curentDistrictID, this.curentWardID, this.fullName, this.phone, voucher);
    this.Api.createOrder(order, result => {
      if (result !== null) {
        this.allPrice = result.total_price + result.ship_price;
        this.shipPrice = result.ship_price;
        if (!preOrderer) {
          this.Api.CleanPackage(done=>{
            this.router.navigate(['thankfull']);
          });
        }
      }
    });
  }

}
