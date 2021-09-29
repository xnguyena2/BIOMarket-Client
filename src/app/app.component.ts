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


  title = 'Trùm Biển | Hải Sản Cao Cấp';
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

  isOpenMenu: boolean = true;

  visibilitySearchBar: string = '';

  isMobileMode = false;

  listResult: BeerDetail[] = [];


  //show success after add cart
  showAddCartPopup: boolean = false;
  productPreviewImg: string = '';
  productUnitTitle: string = '';
  productCount: number = 1;
  productPrice: number = 0;
  hideActionID: string = '';

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
    this.appService.registerShowSuccessProduct(product =>{
      this.productPreviewImg = product.img;
      this.productUnitTitle = product.title;
      this.productCount = product.count;
      this.productPrice = product.price;
      this.showSuccessPopUP();
    });
  }

  closeMenu() {
    if (this.isOpenMenu)
      return;
    this.isOpenMenu = true;
  }


  private setupForNavbarSticky(element: ElementRef) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) {
          // console.log('navbar sticky');
          //this.loadImage();
          //obs.unobserve(element.nativeElement);
          this.isNavBarSticky = true;
        } else {
          // console.log('navbar not sticky');
          this.isNavBarSticky = false;
        }
        this.closeMenu();
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
    this.closeMenu();
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

  //show and hide success add product


  showSuccessPopUP() {
    this.showAddCartPopup = true;
    this.changeScroll(false);
    const currentActionID = this.APIService.GenerateID();
    this.hideActionID = currentActionID;
    setTimeout(() => {
      if (this.hideActionID === currentActionID) {
        this.hideByingPopup();
      }
    }, 3000);
  }

  hideSuccessPopUP(mouse: MouseEvent) {
    if (mouse.target !== mouse.currentTarget) {
      return;
    }
    this.hideByingPopup();
  }

  hideByingPopup() {
    this.hideActionID = '';
    this.showAddCartPopup = false;
    this.changeScroll(true);
  }

  changeScroll(isEnable: boolean) {
    if (isEnable) {
      document.getElementById('main-body')?.classList.remove('disable-scroll');
    } else {
      document.getElementById('main-body')?.classList.add('disable-scroll');
    }
  }
}
