import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged
} from "rxjs/operators";
import { AppConfig } from './config/AppConfig';
import { BeerSubmitData, Category } from './object/BeerDetail';
import { SearchQuery } from './object/SearchQuery';
import { APIService } from './services/api.service';
import { AppService } from './services/app.service';
import { LoaderService } from './services/loader.service';
import { environment } from './config/AppValue';
import { HomeComponent } from './home/home.component';
import { BootStrap } from './object/BootStrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  readonly maxSearResult: number = 10;


  title = 'Sổ Điện Tử | Quản lý bán hàng chuyên nghiệp';

  CatetoryDrop: Category[] = AppConfig.CatetoryDrop;

  notification: string = 'Alter';
  isShowAlter: boolean = false;

  @ViewChild('over', { static: false }) over!: ElementRef;
  @ViewChild('searchText', { static: false }) searchInput!: ElementRef;
  @ViewChild('resetFocus', { static: false }) resetFocus!: ElementRef;
  @ViewChild('header', { static: false }) header!: ElementRef;
  @ViewChild('wrapSearch', { static: false }) wrapSearch!: ElementRef;

  subscription: Subscription = new Subscription();
  subject = new Subject<string>();

  totalProduct: number = 0;

  showHoverMenu: boolean = true;

  isNavBarSticky: boolean = false;

  isOpenMenu: boolean = true;

  isMobileMode = false;

  listResult: BeerSubmitData[] = [];


  isInputSearchFocus: boolean = false;

  showStickyNotification: boolean = false;
  stickyNotificationTxt: string = '';


  //show success after add cart
  showAddCartPopup: boolean = false;
  productPreviewImg: string = '';
  productUnitTitle: string = '';
  productCount: number = 1;
  productPrice: number = 0;
  hideActionID: string = '';


  bootStrapConfig: Promise<BootStrap> = new Promise<BootStrap>
    ((resolve, reject) => { });

  storePhone: string = '0987654321';
  storeAddress: string = '';
  storeEmail: string = '';
  storeFacebook: string = '';

  isLoadingBootStrap: boolean = true;

  constructor(
    private APIService: APIService,
    private appService: AppService,
    private scroll: ViewportScroller,
    private router: Router,
    public loader: LoaderService) {
    this.appService.registerScrollChange(this.changeScroll);
    this.appService.registerScrollToTop(_ => {
      console.log('go to top');
      this.scroll.scrollToPosition([0, 0]);
    });
  }

  ngAfterViewInit(): void {
    this.setupForNavbarSticky(this.header);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.stickyNotificationTxt = AppConfig.stickyNotify;
    this.storeEmail = AppConfig.email;
    this.storeFacebook = AppConfig.facebook;

    let getLink = window.location.href;
    var subdomain = getLink.split(".")[0].replace('https://', '').replace('http://', '');
    environment.groupID = subdomain;
    console.log(environment.groupID);

    this.bootStrapConfig = this.APIService.LoadBootStrap(result => {
    }).then(bootStrap => {
      if (bootStrap) {
        this.storePhone = bootStrap.store.phone;
        this.storeAddress = bootStrap.store.address ?? '';
        this.title = bootStrap.store.name;
        environment.groupID = bootStrap.store.group_id;
        environment.storeName = bootStrap.store.name;
        environment.storePhone = bootStrap.store.phone;

        let categoryArray: string[] = JSON.parse(bootStrap.deviceConfig.categorys);
        this.CatetoryDrop = categoryArray?.map(item => {
          let cat: Category = {
            title: item,
            value: item
          };
          return cat;
        });
        AppConfig.CatetoryDrop = this.CatetoryDrop;

        this.APIService.GetMyPackage(result => {
        });

        this.closeBootStrapPopup();
      }
      return bootStrap;
    });

    this.subscription = this.subject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(searchText => this.search(searchText))
    ).subscribe();

    this.appService.registerPackageNum(num => {
      this.totalProduct = num;
    })

    this.appService.registerAlter(text => {
      this.notification = text;
      this.isShowAlter = true;
    });
    this.appService.registerShowSuccessProduct(product => {
      this.productPreviewImg = product.img;
      this.productUnitTitle = product.title;
      this.productCount = product.count;
      this.productPrice = product.price;
      this.showSuccessPopUP();
    });
  }

  onOutletLoaded(component: HomeComponent | any) {
    if (component instanceof HomeComponent
      || component instanceof SearchComponent
      || component instanceof ProductDetailComponent) {
      component.bootStrapConfig = this.bootStrapConfig;
    }
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
          this.isNavBarSticky = true;
        } else {
          this.isNavBarSticky = false;
        }
        this.closeMenu();
      });
    }
    );
    obs.observe(element.nativeElement);
  }

  closeBootStrapPopup() {
    this.isLoadingBootStrap = false;
  }

  closeAlter() {
    this.isShowAlter = false;
    this.notification = '';
  }

  search(value: string) {
    if (value === '') {
      if (this.listResult.length > 0) {
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
    this.showOver();
    this.focusSearchInput();
  }

  clearSearchText() {
    this.listResult = [];
    if (this.isMobileMode) {
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
    this.isInputSearchFocus = true;
    this.searchInput.nativeElement.focus();
  }

  searchInputFocusOut(event: FocusEvent) {
    if (event.target !== document.activeElement) { // This is where the magic happens!
      if (this.wrapSearch.nativeElement !== document.activeElement) {
        this.isInputSearchFocus = false;
      }
    }
  }

  onSearchEnter(searchText: string) {
    if (searchText === '')
      return;
    this.router.navigate(['search', searchText]);
    if (this.isMobileMode) {
      this.clearSearchText();
    }
    this.hideOver();
    this.focusOver();
  }

  categorySearch(searchText: string) {
    this.gotoPath('search', searchText);
  }

  gotoPath(path: string, subpath: string) {
    this.router.navigate([path, subpath]);
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
    this.appService.changeScrollToTop(true);
    if (this.isMobileMode) {
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
