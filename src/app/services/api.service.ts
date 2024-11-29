import { Injectable } from '@angular/core';

import { isDevMode } from '@angular/core';

import { HttpEvent, HttpResponse } from '@angular/common/http';

import { AppConfig } from '../config/AppConfig'
import { BootStrap } from '../object/BootStrap';
import { SearchResult } from '../object/SearchResult'

import { RequestService } from './request.service';
import { SearchQuery } from '../object/SearchQuery';
import { removeVietnameseTones } from '../config/Utils';
import { Observable } from 'rxjs';
import { BeerSubmitData } from '../object/BeerDetail';
import { CookieService } from 'ngx-cookie-service';
import { ProductPackage } from '../object/ProductPackage';
import { UserInfoQuery } from '../object/UserInfoQuery';
import { Buyer, PackageDataResponse, ProductInPackageResponse } from '../object/MyPackage';
import { AppService } from './app.service';
import { District, Region, Ward } from '../object/Region';
import { PackageIteamRemove } from '../object/PackageOrderData';
import { environment } from '../config/AppValue';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  readonly cookieAPP: string = "biomarketuserid";

  private currentResult: SearchResult = new SearchResult();

  userID: string = '';

  HostURL: string = '';

  myPackage: PackageDataResponse = new PackageDataResponse();

  constructor(
    private requestServices: RequestService,
    private cookieService: CookieService,
    private appServices: AppService) {
    if (isDevMode()) {
      this.HostURL = AppConfig.DevHostUrl;
    } else {
      this.HostURL = AppConfig.HostUrl;
    }
    if (!this.cookieService.check(this.cookieAPP)) {
      this.userID = this.GenerateID();
      environment.packageID = this.GenerateID();
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

  public createOrder(productPackage: ProductPackage, cb: (result: PackageDataResponse | null) => void) {
    this.requestServices.post(`${this.HostURL}package/buyerfromwebsubmit`, productPackage).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('create order: ');
          console.log(event.body);
          cb(this.myPackage);
        }
      },
      err => {
        console.log(err);
        cb(null);
      });
  }

  public AddToPackage(packageItem: ProductPackage, cb: (success: boolean) => void) {
    if (!packageItem.buyer) {
      packageItem.buyer = new Buyer(this.userID);
    }
    console.log(packageItem);
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
    this.appServices.changePackageNum(this.myPackage?.items?.reduce((t, x) => t + x.number_unit, 0) ?? 0)
  }

  alredyGetPackageRequest: boolean = false;
  public GetMyPackage(cb: (result: PackageDataResponse) => void) {
    this.appServices.registerPackage(cb);
    if (!this.alredyGetPackageRequest) {
      this.alredyGetPackageRequest = true;
      this.GetPackage();
    } else {
      console.log("alredy get package request!");
    }
  }

  public GetPackage() {
    console.log(environment.groupID);
    this.requestServices.post(`${this.HostURL}package/getbydeviceforweb`, new UserInfoQuery(environment.groupID, 0, 10000, this.userID)).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          let listPaackage: PackageDataResponse[] = event.body;
          console.log('get package of userid: ' + this.userID);
          console.log(listPaackage);
          if (listPaackage.length > 0) {
            this.myPackage = listPaackage[0];
            environment.packageID = this.myPackage.package_second_id;
          } else {
            environment.packageID = this.GenerateID();
          }
          this.appServices.changePackage(this.myPackage);
          this.UpdatePackageNum();
        }
      },
      err => {
        console.log(err);
      });
  }

  public DeleteProductFromPackage(item: ProductInPackageResponse, cb: (result: boolean) => void) {
    const packageID: PackageIteamRemove = {
      group_id: environment.groupID,
      device_id: this.userID,
      unit_id: item.product_unit_second_id,
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
    this.requestServices.post(`${this.HostURL}package/clean`, new UserInfoQuery(environment.groupID, 0, 10000, this.userID)).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.myPackage = new PackageDataResponse();
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

  alredyGetRegion: boolean = false;
  public GetAllRegion(cb: (result: Region[]) => void) {
    if (!this.alredyGetRegion) {
      this.alredyGetRegion = true;
      this.requestServices.get(`${this.HostURL}address/allregionformat`).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            cb(event.body);
          }
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("alredy get region request!");
    }
  }

  public GetAllDistrict(region: number, cb: (result: District[]) => void) {
    this.requestServices.get(`${this.HostURL}address/districtformat/` + region).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public GetAllWard(region: number, district: number, cb: (result: Ward[]) => void) {
    this.requestServices.get(`${this.HostURL}address/wardformat/${region}/${district}`).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          cb(event.body);
        }
      },
      err => {
        console.log(err);
      });
  }

  public LoadBootStrap(cb: (result: BootStrap) => void): Promise<BootStrap> {
    return new Promise<BootStrap>
      ((resolve, reject) => {
        this.requestServices.get(`${this.HostURL}clientdevice/bootstrap/${environment.groupID}`).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.currentResult = new SearchResult();
              this.currentResult.result = event.body.products;
              const result = event.body;
              console.log('bootstrap data: ');
              console.log(result);
              cb(result);
              resolve(result);
            }
          },
          err => {
            console.log(err);
            const empty = new BootStrap();
            cb(empty);
            resolve(empty);
          });

      });
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

  public GetProductDetail(productID: string, cb: (p?: BeerSubmitData) => void) {
    if (this.currentResult.result !== undefined) {
      let listP = this.currentResult?.result?.filter(p => p.beerSecondID === productID);
      if (listP.length > 0) {
        setTimeout(() => cb(listP[0]), 0);
        return;
      }
    }
    this.requestServices.get(`${this.HostURL}beer/detail/${environment.groupID}/${productID}`).subscribe(
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
