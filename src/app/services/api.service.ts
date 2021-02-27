import { Injectable, isDevMode } from '@angular/core';

import { HttpEvent, HttpResponse } from '@angular/common/http';

import { AppConfig } from '../config/AppConfig'
import { BootStrap } from '../object/BootStrap';
import { SearchResult } from '../object/SearchResult'

import { RequestService } from './request.service';
import { SearchQuery } from '../object/SearchQuery';
import { removeVietnameseTones } from '../config/Utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  HostURL = AppConfig.HostUrl;

  constructor(
    private requestServices: RequestService,) { }

  public LoadBootStrap(cb: (result: BootStrap) => void) {
    if (!isDevMode()) {
      cb(BootStrap.TestData);
    } else {
      this.requestServices.get(`${this.HostURL}clientdevice/bootstrap`).subscribe(
        event => {
          if (event instanceof HttpResponse) {
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
    if (!isDevMode()) {
      cb(SearchResult.TestData);
    } else {
      this.search(searchQuery).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            console.log('search result: ');
            console.log(event.body);
            cb(event.body);
          }
        },
        err => {
          console.log(err);
          cb(new SearchResult());
        });
    }
  }
}
