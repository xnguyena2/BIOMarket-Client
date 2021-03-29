import { Injectable, isDevMode } from '@angular/core';

import { HttpEvent, HttpResponse } from '@angular/common/http';

import { AppConfig } from '../config/AppConfig'
import { BootStrap } from '../object/BootStrap';
import { SearchResult } from '../object/SearchResult'

import { RequestService } from './request.service';
import { SearchQuery } from '../object/SearchQuery';
import { removeVietnameseTones } from '../config/Utils';
import { Observable } from 'rxjs';
import { BeerDetail } from '../object/BeerDetail';
import { CookieService } from 'ngx-cookie-service';
import { ProductPackage } from '../object/ProductPackage';
import { UserInfoQuery } from '../object/UserInfoQuery';
import { MyPackage } from '../object/MyPackage';
import { ObjectID } from '../object/ObjectID';
import { AppService } from './app.service';
import { Region } from '../object/Region';
import { PackageOrder, PackageOrderData } from '../object/PackageOrderData';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  readonly cookieAPP: string = "biomarketuserid";

  private currentResult: SearchResult = new SearchResult();

  userID: string = '';

  HostURL = AppConfig.HostUrl;

  myPackage: MyPackage[] = [];

  constructor(
    private requestServices: RequestService,
    private cookieService: CookieService,
    private appServices: AppService) {
    if (!this.cookieService.check(this.cookieAPP)) {
      this.userID = this.GenerateID();
      this.cookieService.set(this.cookieAPP, this.userID, { path: '/' });
    } else {
      this.userID = this.cookieService.get(this.cookieAPP);
      //console.log(this.userID);
    }
  }

  public GenerateID(): string {
    const current = new Date();
    return String(current.setMilliseconds(0));
  }

  public createOrder(packageOrderData: PackageOrderData, cb: (result: PackageOrder | null) => void) {
    packageOrderData.packageOrder.user_device_id = this.userID;
    this.requestServices.post(`${this.HostURL}order/create`, packageOrderData).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('create order: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
        cb(null);
      });
  }

  public AddToPackage(packageItem: ProductPackage, cb: (success: boolean) => void) {
    packageItem.deviceID = this.userID;
    this.requestServices.post(`${this.HostURL}package/add`, packageItem).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.currentResult = new SearchResult();
          this.currentResult.result = event.body.products;
          console.log('add package: ');
          console.log(event.body);
          cb(true);
          this.UpdatePackageNum();
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public UpdatePackageNum() {
    this.appServices.changePackageNum(this.myPackage.reduce((t, x) => t + x.number_unit, 0))
  }

  alredyGetPackageRequest: boolean = false;
  public GetMyPackage(cb: (result: MyPackage[]) => void) {
    this.appServices.registerPackage(cb);
    if (!this.alredyGetPackageRequest) {
      this.alredyGetPackageRequest = true;
      this.GetPackage();
    } else {
      console.log("alredy get package request!");
    }
  }

  public GetPackage() {
    this.requestServices.post(`${this.HostURL}package/getall`, new UserInfoQuery(0, 10000, this.userID)).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.myPackage = event.body;
          console.log('my package: ' + this.userID);
          console.log(this.myPackage);
          this.appServices.changePackage(this.myPackage);
          this.UpdatePackageNum();
        }
      },
      err => {
        console.log(err);
      });
  }

  public DeleteProductFromPackage(item: MyPackage, cb: (result: boolean) => void) {
    const packageID: ObjectID = {
      id: item.beer_unit
    }
    this.requestServices.post(`${this.HostURL}package/remove`, packageID).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('delete package: ');
          console.log(event.body);
          cb(true);
          this.UpdatePackageNum();
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public CleanPackage(cb: (result: boolean) => void) {
    this.requestServices.post(`${this.HostURL}package/clean`, new UserInfoQuery(0, 10000, this.userID)).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.myPackage = [];
          console.log('clean my package: ' + this.userID);
          this.appServices.changePackage(this.myPackage);
          this.UpdatePackageNum();
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  alredyGetRegion:boolean = false;
  public GetAllRegion(cb: (result: Region[]) => void) {
    this.appServices.registerRegion(cb);
    if(!this.alredyGetRegion){
      this.alredyGetRegion = true;
      this.requestServices.get(`${this.HostURL}address/allregion/`).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            //console.log(this.myRegion);
            //cb(event.body);
            this.appServices.changeRegion(event.body);
          }
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("alredy get region request!");
    }
  }

  public GetAllDistrict(region: number) {
    this.requestServices.post(`${this.HostURL}address/district/` + region, new UserInfoQuery(0, 10000, this.userID)).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('all region: ' + this.userID);
          console.log(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public LoadBootStrap(cb: (result: BootStrap) => void) {
    if (!isDevMode() && false) {
      cb(BootStrap.TestData);
    } else {
      this.requestServices.get(`${this.HostURL}clientdevice/bootstrap`).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.currentResult = new SearchResult();
            this.currentResult.result = event.body.products;
            console.log('bootstrap data: ');
            console.log(event.body);
            cb(event.body);
          }
        },
        err => {
          console.log(err);
          cb(new BootStrap());
        });
    }
  }

  private search(searchQuery: SearchQuery): Observable<HttpEvent<any>> {
    if (searchQuery.query === 'all') {
      return this.requestServices.post(`${this.HostURL}beer/getall`, searchQuery)
    } else if (AppConfig.CatetoryDrop.filter(c => c.value === searchQuery.query).length > 0) {
      return this.requestServices.post(`${this.HostURL}beer/category`, searchQuery)
    }
    else {
      searchQuery.query = removeVietnameseTones(searchQuery.query);
      return this.requestServices.post(`${this.HostURL}beer/search`, searchQuery);
    }
  }

  public SearchBeer(searchQuery: SearchQuery, cb: (result: SearchResult) => void) {
    if (!isDevMode() && false) {
      cb(SearchResult.TestData);
    } else {
      this.search(searchQuery).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.currentResult = event.body;
            console.log('search result: ');
            console.log(this.currentResult);
            cb(this.currentResult);
          }
        },
        err => {
          console.log(err);
          cb(new SearchResult());
        });
    }
  }

  public GetProductDetail(productID: string, cb: (p?: BeerDetail) => void) {
    if (this.currentResult.result !== undefined) {
      let listP = this.currentResult?.result?.filter(p => p.beerSecondID === productID);
      if (listP.length > 0) {
        setTimeout(() => cb(listP[0]), 0);
        return;
      }
    }
    this.requestServices.get(`${this.HostURL}beer/detail/${productID}`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('load beer detail: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
        cb(undefined);
      });
  }
}
