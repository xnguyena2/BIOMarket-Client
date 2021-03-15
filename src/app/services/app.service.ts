import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly IGNORE: string = 'IGNORE';

  readonly IGNORE_PAGE: number = -1;

  private filterSource = new BehaviorSubject<string>(this.IGNORE);
  private filter = this.filterSource.asObservable();


  constructor() {
   }


  //filter
  public registerFilter(func: (filter: string) => void) {
    this.filter.pipe(filter(x => x !== this.IGNORE)).subscribe(f => func(f));
  }

  public changeFilter(filter: string) {
    this.filterSource.next(filter);
  }
}
