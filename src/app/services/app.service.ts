import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MyPackage } from '../object/MyPackage';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly IGNORE: string = 'IGNORE';
  readonly IGNORENUM: number = -1;
  readonly IGNOREPACKAGE: MyPackage[] = [];

  private packageSource = new BehaviorSubject<MyPackage[]>(this.IGNOREPACKAGE);
  private package = this.packageSource.asObservable();

  private packageCountSource = new BehaviorSubject<number>(this.IGNORENUM);
  private packageCount = this.packageCountSource.asObservable();


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
}
