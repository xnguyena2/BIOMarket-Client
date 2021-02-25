import { Injectable, isDevMode } from '@angular/core';

import { HttpResponse } from '@angular/common/http';

import { AppConfig } from '../config/AppConfig'
import { BootStrap } from '../object/BootStrap';
import { SearchResult } from '../object/SearchResult'

import { RequestService } from './request.service';
import { SearchQuery } from '../object/SearchQuery';
import { removeVietnameseTones } from '../config/Utils';

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
            console.log(event.body);
            cb(event.body);
          }
        },
        err => {
          console.log('Could not load data!');
          console.log(err);
          cb(new BootStrap());
        });
    }
  }

  public SearchBeer(searchQuery: SearchQuery, cb: (result: SearchResult) => void) {
    searchQuery.query = removeVietnameseTones(searchQuery.query);
    if(!isDevMode()){
      cb(SearchResult.TestData);
    }else {
      this.requestServices.post(`${this.HostURL}beer/search`, searchQuery).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event.body);
            cb(event.body);
          }
        },
        err => {
          console.log('Could not load data!');
          console.log(err);
          cb(new SearchResult());
        });
    }
  }
}
