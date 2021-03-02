import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

import { faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged
} from "rxjs/operators";
import { AppConfig } from './config/AppConfig';
import { BeerDetail } from './object/BeerDetail';
import { SearchQuery } from './object/SearchQuery';
import { SearchResult } from './object/SearchResult';
import { APIService } from './services/api.service';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'BIOMarket | Chuyên Bia Nhập Khẩu';
  fashoppingcart = faShoppingCart;
  faSearch = faSearch;
  faClose = faTimes;
  hostUrl = AppConfig.HostUrl;
  faFacebook = faFacebookSquare;
  faInstagram = faInstagramSquare;

  CatetoryDrop = AppConfig.CatetoryDrop;

  readonly noFilter: string = '';
  readonly noPage: number = -1;


  @ViewChild('over', { static: false }) over!: ElementRef;
  @ViewChild('searchText', { static: false }) searchInput!: ElementRef;
  @ViewChild('resetFocus', { static: false }) resetFocus!: ElementRef;

  subscription: Subscription = new Subscription();
  subject = new Subject<string>();

  showHoverMenu: boolean = true;

  visibilitySearchBar: string = '';

  isMobileMode = false;

  listResult: BeerDetail[] = [];

  searchWithFilter: (filter: string) => void = defaultArg => {
    console.log("Just Init!");
  };

  searchWithPaging: (page: number) => void = defaultArg => {
    console.log("Just Init!");
  };

  constructor(private AppService: AppService,
    private APIService: APIService,
    private router: Router,
    private APP: AppService) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.subject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(searchText => this.search(searchText, 10, false, this.noFilter, this.noPage))
    ).subscribe();

    this.AppService.registerFilter(filter => {
      this.searchWithFilter(filter);
    });

    //search
    this.AppService.registerSearch(query => {
      console.log("search from api: " + query);

      this.search(query, 24, true, this.noFilter, this.noPage);
    });

    //paging
    this.AppService.registerPage(page => {
      this.searchWithPaging(page);
    });
  }

  isInSearchMode(): boolean {
    return this.router.url.includes('/search');
  }

  onSearchEnter(searchText: string) {
    this.searchNavigation(searchText);
    if (this.isMobileMode) {
      this.clearSearchText();
    }
    this.hideOver();
    this.focusOver();
  }

  searchNavigation(searchText: string) {
    if (this.isInSearchMode()) {
      this.search(searchText, 24, true, this.noFilter, this.noPage);
    } else {
      this.router.navigate(['search', searchText]);
    }
  }

  search(value: string, maxSearch: number, onEnter: boolean, filter: string, page: number) {
    if (value === '') {
      if (this.listResult !== []) {
        this.listResult = [];
        if (this.isInSearchMode() && onEnter) {
          const emptyResult = new SearchResult();
          emptyResult.isResetFilter = this.isNoFilter(filter);
          this.APP.sendSearchResult(emptyResult);
        }
      }
    } else {
      this.APIService.SearchBeer(new SearchQuery(value, this.isNoPage(page) ? 0 : page, maxSearch, filter), result => {
        if (result) {
          if (!onEnter) {
            this.listResult = result.result;
          } else if (this.isInSearchMode()) {
            this.searchWithFilter = function (newFilter: string): void {
              this.search(value, maxSearch, onEnter, newFilter, this.noPage);
            }
            this.searchWithPaging = function (nextPage: number) {
              this.search(value, maxSearch, onEnter, filter, nextPage);
            }
            result.isResetFilter = this.isNoFilter(filter);
            result.isResetPage = this.isNoPage(page);
            result.searchTxt = value;
            this.APP.sendSearchResult(result);
          }
        }
      });
    }
  }

  isNoFilter(filter: string) {
    return filter === this.noFilter
  }

  isNoPage(page: number) {
    return page === this.noPage;
  }

  onSearch(searchText: string) {
    this.subject.next(searchText);
  }

  mobileShowSearch() {
    console.log("mobile search click");
    this.isMobileMode = true;
    this.visibilitySearchBar = 'visible';
    this.showOver();
    this.focusSearchInput();
  }

  clearSearchText() {
    this.listResult = [];
    if (this.isMobileMode) {
      this.visibilitySearchBar = 'hidden';
    }
    this.searchInput.nativeElement.value = '';
    this.hideOver();
  }

  hideOver() {
    this.over.nativeElement
    this.over.nativeElement.classList.remove('over-show');
  }

  showOver() {
    this.over.nativeElement.classList.add('over-show');
  }

  focusSearchInput() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  categorySearch(searchText: string) {
    this.searchNavigation(searchText);
    this.hideHoverMenu();
  }

  hideHoverMenu() {
    this.showHoverMenu = false;
    setTimeout(() => {
      this.showHoverMenu = true;
    }, 300);
  }

  focusOver() {
    setTimeout(() => this.resetFocus.nativeElement.focus(), 0);
  }
}
