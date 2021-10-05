import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
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

  constructor() {
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
}
