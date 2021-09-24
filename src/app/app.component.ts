import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

import { faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  mergeMap
} from "rxjs/operators";
import { AppConfig } from './config/AppConfig';
import { BeerDetail } from './object/BeerDetail';
import { SearchQuery } from './object/SearchQuery';
import { APIService } from './services/api.service';
import { AppService } from './services/app.service';
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  readonly maxSearResult: number = 10;


  title = 'Trùm Biển | Hải Sản Chất Lượng Cao';
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
  @ViewChild('header', { static: false }) header!: ElementRef;

  subscription: Subscription = new Subscription();
  subject = new Subject<string>();

  totalProduct: number = 0;

  showHoverMenu: boolean = true;

  isNavBarSticky: boolean = false;

  visibilitySearchBar: string = '';

  isMobileMode = false;

  listResult: BeerDetail[] = [];

  constructor(
    private APIService: APIService,
    private appService: AppService,
    private scroll: ViewportScroller,
    private router: Router,
    public loader: LoaderService) {
  }

  ngAfterViewInit(): void {
    this.setupForNavbarSticky(this.header);
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

    this.appService.registerAlter(text => {
      this.notification = text;
      this.isShowAlter = true;
    });
  }


  private setupForNavbarSticky(element: ElementRef) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) {
          console.log('navbar sticky');
          //this.loadImage();
          //obs.unobserve(element.nativeElement);
          this.isNavBarSticky = true;
        }else{
          console.log('navbar not sticky');
          this.isNavBarSticky = false;
        }
      });
    }
    );
    obs.observe(element.nativeElement);
  }

  closeAlter() {
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
