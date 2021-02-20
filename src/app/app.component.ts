import { Component } from '@angular/core';

import { faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppConfig } from './config/AppConfig';
import { BeerDetail } from './object/BeerDetail';
import { SearchQuery } from './object/SearchQuery';
import { APIService } from './services/api.service';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BIOMarket | Chuyên Bia Nhập Khẩu';
  fashoppingcart = faShoppingCart;
  faSearch = faSearch;
  faClose = faTimes;
  hostUrl = AppConfig.HostUrl;

  visibilitySearchBar: string = '';

  isMobileMode = false;

  listResult: BeerDetail[] = [];

  constructor(private AppService: AppService,
    private APIService: APIService) {
    //this.AppService.registerHideProductMenu(this.hideProductMenu);
  }

  onSearchEnter(value: string) {
  }

  onSearch(value: string) {
    if (value == '') {
      if (this.listResult != []) {
        this.listResult = [];
      }
    } else {
      this.APIService.SearchBeer(new SearchQuery(value, 0, 10), result => {
        if (result) {
          this.listResult = result.result;
        }
      });
    }
  }

  mobileShowSearch() {
    console.log("show click");

    this.isMobileMode = true;
    this.visibilitySearchBar = 'visible';
  }

  clearSearchText() {
    this.listResult = [];
    if (this.isMobileMode) {
      this.visibilitySearchBar = 'hidden';
    }
  }
}
