import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buyer, PackageDataResponse, UserPackage } from '../object/MyPackage';
import { District, Region, Ward } from '../object/Region';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';
import { environment } from '../config/AppValue';
import { PackageID } from '../object/PackageID';
import { ProductPackage } from '../object/ProductPackage';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent implements OnInit {

  myRegion: Region[] = [];
  myDistrict: District[] = [];
  myWard: Ward[] = [];

  showCart = false;
  ready = false;

  totalPrice: number = 0;
  shipPrice: number = 0;
  allPrice: number = 0;

  myPackage: PackageDataResponse = new PackageDataResponse();

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
    private router: Router) { }

  ngOnInit(): void {
    this.Api.GetAllRegion(result => {
      this.myRegion = result;
    });
    this.Api.GetMyPackage(result => {
      this.myPackage = result;
      this.ready = true;
      this.appServices.changeScrollToTop(true);
      this.getTotalPrice();
    });
  }

  getTotalPrice() {
    this.totalPrice = PackageDataResponse.getPrice(this.myPackage);
    this.allPrice = this.totalPrice + this.shipPrice;
    this.showCart = PackageDataResponse.getCartNo(this.myPackage) != 0;
  }

  changeRegion(region: string) {
    this.curentRegionID = Number(region);
    this.Api.GetAllDistrict(this.curentRegionID, result => {
      this.myDistrict = result;
    });
    this.myWard = [];
  }

  changeDistrict(district: string) {
    this.curentDistrictID = Number(district);
    this.Api.GetAllWard(this.curentRegionID, this.curentDistrictID, result => {
      this.myWard = result;
      this.getPrice('', true);
    });
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
    const order: PackageID = new PackageID(environment.groupID, this.myPackage.package_second_id);
    let packageItem: ProductPackage = new ProductPackage(this.myPackage.package_second_id,
      this.myPackage.buyer, this.myPackage.items
    );
    if (preOrderer) {
      return;
    }
    let buyer = new Buyer(this.myPackage.device_id);
    buyer.phone_number = this.phone;
    buyer.region_id = this.curentRegionID;
    buyer.district_id = this.curentDistrictID;
    buyer.ward_id = this.curentWardID;
    buyer.reciver_fullname = this.fullName;
    buyer.reciver_address = this.address;
    packageItem.buyer = buyer;
    this.Api.createOrder(packageItem, result => {
      if (result !== null) {
        this.allPrice = PackageDataResponse.getPrice(result) + result.ship_price;
        this.shipPrice = result.ship_price;
        if (!preOrderer) {
          this.Api.CleanPackage(done => {
            this.router.navigate(['thankfull']);
          });
        }
      }
    });
  }

}
