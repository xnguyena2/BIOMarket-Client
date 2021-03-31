import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MyPackage } from '../object/MyPackage';
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

  private regionSource = new BehaviorSubject<Region[]>(this.IGNOREREGION);
  private region = this.regionSource.asObservable();

  private alterSource = new BehaviorSubject<string>(this.IGNORE);
  private alter = this.alterSource.asObservable();

  constructor() {
  }


  //package
  public registerPackage(func: (filter: MyPackage[]) => void) {
    this.package.pipe(filter(x => x !== null && x !== undefined && x !== this.IGNOREPACKAGE && x.length > 0)).subscribe(f => func(f));
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

  //region
  public registerRegion(func: (filter: Region[]) => void) {
    this.region.pipe(filter(x => x !== this.IGNOREREGION)).subscribe(f => func(f));
  }
  public changeRegion(filter: Region[]) {
    this.regionSource.next(filter);
  }

  //alter
  public registerAlter(func: (filter: string) => void) {
    this.alter.pipe(filter(x => x !== this.IGNORE)).subscribe(f => func(f));
  }
  public changeAlter(filter: string) {
    this.alterSource.next(filter);
  }
}
