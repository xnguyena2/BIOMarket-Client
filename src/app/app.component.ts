import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  readonly maxSearResult: number = 10;


  title = 'Trùm Biển | Hải Sản Cao Cấp';

  CatetoryDrop = AppConfig.CatetoryDrop;

  notification: string = 'Alter';
  isShowAlter: boolean = false;

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

  listResult: BeerDetail[] = [];


  isInputSearchFocus: boolean = false;

  showStickyNotification: boolean = true;


  //show success after add cart
  showAddCartPopup: boolean = false;
  productPreviewImg: string = '';
  productUnitTitle: string = '';
  productCount: number = 1;
  productPrice: number = 0;
  hideActionID: string = '';

  constructor(
    private titleService: Title,
    private metaService: Meta,
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
    this.appService.registerChangeTitle(title => {
      this.setTitle(title);
    });

    this.appService.registerChangeTag(tag => {
      this.setTag(tag);
    });
  }

  ngAfterViewInit(): void {
    if (this.appService.isBrowser) {
      this.setupForNavbarSticky(this.header);
    }
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
    this.appService.registerShowSuccessProduct(product => {
      this.productPreviewImg = product.img;
      this.productUnitTitle = product.title;
      this.productCount = product.count;
      this.productPrice = product.price;
      this.showSuccessPopUP();
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public setTag(newTag: string) {
    this.metaService.updateTag({
      name: 'description',
      content: newTag
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

  clearSearchText() {
    this.listResult = [];
    this.searchInput.nativeElement.value = '';
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
    this.focusOver();
  }

  focusOver() {
    this.resetFocus.nativeElement.focus()
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

  resetSearch() {
    this.appService.changeScrollToTop(true);
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
