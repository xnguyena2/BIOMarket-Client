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

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private currentResult: SearchResult = new SearchResult();

  HostURL = AppConfig.HostUrl;

  constructor(
    private requestServices: RequestService,) { }

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
    let listP = this.currentResult.result.filter(p => p.beerSecondID === productID);
    if (listP.length > 0) {
      setTimeout(()=>cb(listP[0]), 0);
    } else {
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
}
