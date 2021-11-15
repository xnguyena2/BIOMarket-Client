import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BeerDetail } from '../object/BeerDetail';
import { MyPackage } from '../object/MyPackage';
import { ProductAddSuccess } from '../object/ProductAddSuccess';
import { Region } from '../object/Region';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly IGNORE: string = 'IGNORE';
  readonly IGNORENUM: number = -1;
  readonly IGNOREPACKAGE: MyPackage[] = [];
  readonly IGNOREREGION: Region[] = [];


  private packageSource = new BehaviorSubject<MyPackage[]>(this.IGNOREPACKAGE);
  private package = this.packageSource.asObservable();

  private packageCountSource = new BehaviorSubject<number>(this.IGNORENUM);
  private packageCount = this.packageCountSource.asObservable();

  private alterSource = new BehaviorSubject<string>(this.IGNORE);
  private alter = this.alterSource.asObservable();

  private changeScrollSource = new BehaviorSubject<boolean | null>(null);
  private changeScroll = this.changeScrollSource.asObservable();

  private scrollToTopSource = new BehaviorSubject<boolean>(false);
  private scrollToTop = this.scrollToTopSource.asObservable();

  private showProductSuccessSource = new BehaviorSubject<ProductAddSuccess | null>(null);
  private showProductSuccess = this.showProductSuccessSource.asObservable();

  //chagne title
  private changeTitleSource = new BehaviorSubject<string | null>(null);
  private changeTitle = this.changeTitleSource.asObservable();

  //chagne metatag
  private changeMetaDesTagSource = new BehaviorSubject<string | null>(null);
  private changeMetaDesTag = this.changeMetaDesTagSource.asObservable();

  //chagne rich result
  private changeRichResultSource = new BehaviorSubject<BeerDetail | null>(null);
  private changeRichResultTag = this.changeRichResultSource.asObservable();

  public isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  extractContent(html: string, df: string): string {

    if (this.isBrowser) {
      let content = new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
      if (content === null)
        return df;
      return content;

      // var t = document.createElement('div');
      // t.innerHTML = html;
      // let content = t.textContent;
      // if (content === null)
      //   return this.title;
      // return content;
    } else {
      return html.replace(/<[^>]+>/g, '');
    }
  }


  //package
  public registerPackage(func: (filter: MyPackage[]) => void) {
    this.package.pipe(filter(x => x !== this.IGNOREPACKAGE)).subscribe(f => func(f));
  }
  public changePackage(filter: MyPackage[]) {
    this.packageSource.next(filter);
  }

  //packageNum
  public registerPackageNum(func: (num: number) => void) {
    this.packageCount.pipe(filter(x => x !== this.IGNORENUM)).subscribe(f => func(f));
  }
  public changePackageNum(num: number) {
    this.packageCountSource.next(num);
  }

  //alter
  public registerAlter(func: (filter: string) => void) {
    this.alter.pipe(filter(x => x !== this.IGNORE)).subscribe(f => func(f));
  }
  public changeAlter(filter: string) {
    this.alterSource.next(filter);
  }

  //scroll change
  public registerScrollChange(func: (filter: boolean) => void) {
    this.changeScroll.pipe(filter(x => x !== null)).subscribe(f => func(f!));
  }
  public changeScrollChange(filter: boolean | null) {
    this.changeScrollSource.next(filter);
  }

  //show success product
  public registerShowSuccessProduct(func: (filter: ProductAddSuccess) => void) {
    this.showProductSuccess.pipe(filter(x => x !== null)).subscribe(f => func(f!));
  }
  public showSuccessProduct(filter: ProductAddSuccess | null) {
    this.showProductSuccessSource.next(filter);
  }

  //scroll change
  public registerScrollToTop(func: (filter: boolean) => void) {
    this.scrollToTop.pipe(filter(x => x)).subscribe(f => func(f));
  }
  public changeScrollToTop(filter: boolean) {
    this.scrollToTopSource.next(filter);
  }

  //change title
  public registerChangeTitle(func: (filter: string) => void) {
    this.changeTitle.pipe(filter(x => x !== null)).subscribe(f => func(f!));
  }
  public changeTitlePage(filter: string) {
    this.changeTitleSource.next(filter);
  }

  //change title
  public registerChangeTag(func: (filter: string) => void) {
    this.changeMetaDesTag.pipe(filter(x => x !== null)).subscribe(f => func(f!));
  }
  public changeTagPage(filter: string) {
    this.changeMetaDesTagSource.next(filter);
  }

  //change title
  public registerChangeRichResult(func: (filter: BeerDetail) => void) {
    this.changeRichResultTag.pipe(filter(x => x !== null)).subscribe(f => func(f!));
  }
  public changeRichResult(filter: BeerDetail) {
    this.changeRichResultSource.next(filter);
  }
}
