import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SearchResult } from '../object/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly IGNORE: string = 'IGNORE';

  readonly IGNORE_PAGE: number = -1;

  private searchResultSource = new BehaviorSubject<SearchResult>(SearchResult.IGNORE);
  private searchResult = this.searchResultSource.asObservable();

  private filterSource = new BehaviorSubject<string>(this.IGNORE);
  private filter = this.filterSource.asObservable();

  private searchSource = new BehaviorSubject<string>(this.IGNORE);
  private search = this.searchSource.asObservable();

//chagne page
  private pageSource = new BehaviorSubject<number>(this.IGNORE_PAGE);
  private page = this.pageSource.asObservable();

  constructor() { }

  //send search result
  public registerSearchReceiverResult(func: (result: SearchResult) => void) {
    this.searchResult.pipe(filter(x => x !== SearchResult.IGNORE)).subscribe(subResult => func(subResult));
  }

  public unRegisterSearchReceiverResult() {
    this.searchResultSource = new BehaviorSubject<SearchResult>(SearchResult.IGNORE);
    this.searchResult = this.searchResultSource.asObservable();
  }

  public sendSearchResult(result: SearchResult) {
    this.searchResultSource.next(result);
  }


  //filter
  public registerFilter(func: (filter: string) => void) {
    this.filter.pipe(filter(x => x !== this.IGNORE)).subscribe(f => func(f));
  }

  public changeFilter(filter: string) {
    this.filterSource.next(filter);
  }


  //search
  public registerSearch(func: (query: string) => void) {
    this.search.pipe(filter(x => x !== this.IGNORE)).subscribe(subResult => func(subResult));
  }

  public sendSearch(query: string) {
    this.searchSource.next(query);
  }

  //page
  public registerPage(func: (page: number) => void) {
    this.page.pipe(filter(x => x !== this.IGNORE_PAGE)).subscribe(subResult => func(subResult));
  }

  public changePage(page: number) {
    this.pageSource.next(page);
  }
}
