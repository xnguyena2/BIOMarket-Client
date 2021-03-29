import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
import { APIService } from './services/api.service';
import { AppService } from './services/app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  readonly maxSearResult: number = 10;


  title = 'BIOMarket | Chuyên Bia Nhập Khẩu';
  fashoppingcart = faShoppingCart;
  faSearch = faSearch;
  faClose = faTimes;
  hostUrl = AppConfig.HostUrl;
  faFacebook = faFacebookSquare;
  faInstagram = faInstagramSquare;

  CatetoryDrop = AppConfig.CatetoryDrop;

  notification: string = 'Alter';
  isShowAlter: boolean = false;

  @ViewChild('over', { static: false }) over!: ElementRef;
  @ViewChild('searchText', { static: false }) searchInput!: ElementRef;
  @ViewChild('resetFocus', { static: false }) resetFocus!: ElementRef;

  subscription: Subscription = new Subscription();
  subject = new Subject<string>();


  totalProduct: number = 0;

  showHoverMenu: boolean = true;

  visibilitySearchBar: string = '';

  isMobileMode = false;

  listResult: BeerDetail[] = [];

  constructor(
    private APIService: APIService,
    private appService: AppService,
    private scroll: ViewportScroller,
    private router: Router) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.subject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(searchText => this.search(searchText))
    ).subscribe();
    this.APIService.GetMyPackage(result => {
      //this.listProduct = result;
    });

    this.appService.registerPackageNum(num => {
      this.totalProduct = num;
    })

    this.appService.registerAlter(text =>{
      this.notification = text;
      this.isShowAlter = true;
    });
  }

  closeAlter(){
    this.isShowAlter = false;
    this.notification = '';
  }

  search(value: string) {
    if (value === '') {
      if (this.listResult !== []) {
        this.listResult = [];
      }
    } else {
      this.APIService.SearchBeer(new SearchQuery(value, 0, this.maxSearResult, ''), result => {
        if (result) {
          this.listResult = result.result;
        }
      });
    }
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
    this.over.nativeElement.classList.remove('over-show');
  }

  showOver() {
    this.over.nativeElement.classList.add('over-show');
  }

  focusSearchInput() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  onSearchEnter(searchText: string) {
    this.router.navigate(['search', searchText]);
    if (this.isMobileMode) {
      this.clearSearchText();
    }
    this.hideOver();
    this.focusOver();
  }

  categorySearch(searchText: string) {
    this.router.navigate(['search', searchText]);
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

  resetSearch() {
    this.scroll.scrollToPosition([0, 0]);
    if (this.isMobileMode) {
      this.visibilitySearchBar = 'hidden';
      this.hideOver();
    }
  }
}
