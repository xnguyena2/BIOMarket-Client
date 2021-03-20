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

@Injectable({
  providedIn: 'root'
})
export class APIService {
  readonly cookieAPP: string = "biomarketuserid";

  private currentResult: SearchResult = new SearchResult();

  userID: string = '';

  HostURL = AppConfig.HostUrl;

  myPackage: ProductPackage[] = [];

  constructor(
    private requestServices: RequestService,
    private cookieService: CookieService) {
    if (!this.cookieService.check(this.cookieAPP)) {
      this.userID = this.GenerateID();
      this.cookieService.set(this.cookieAPP, this.userID);
    } else {
      this.userID = this.cookieService.get(this.cookieAPP);
      //console.log(this.userID);
    }
  }

  public GenerateID(): string {
    const current = new Date();
    return String(current.setMilliseconds(0));
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
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public GetMyPackage(cb: (result: MyPackage[]) => void) {
    this.requestServices.post(`${this.HostURL}package/getall`, new UserInfoQuery(0, 10000, this.userID)).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('my package: ');
          console.log(event.body);
          cb(event.body);
        }
      },
      err => {
        console.log(err);
        cb([]);
      });
  }

  public DeleteProductFromPackage(item: MyPackage, cb: (result: boolean)=>void) {
    const packageID:ObjectID = {
      id: item.beer_unit
    }
    this.requestServices.post(`${this.HostURL}package/remove`, packageID).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          console.log('delete package: ');
          console.log(event.body);
          cb(true);
        }
      },
      err => {
        console.log(err);
        cb(false);
      });
  }

  public CleanPackage() {

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
