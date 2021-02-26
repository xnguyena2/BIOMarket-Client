import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SearchResult } from '../object/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly IGNORE: string = 'IGNORE';

  private searchResultSource = new BehaviorSubject<SearchResult>(SearchResult.IGNORE);
  private searchResult = this.searchResultSource.asObservable();

  private filterSource = new BehaviorSubject<string>(this.IGNORE);
  private filter = this.filterSource.asObservable();

  private searchSource = new BehaviorSubject<string>(this.IGNORE);
  private search = this.searchSource.asObservable();

  constructor() { }

  //send search result
  public registerSearchReciverResult(func: (result: SearchResult) => void) {
    this.searchResult.pipe(filter(x => x != SearchResult.IGNORE)).subscribe(subResult => func(subResult));
  }

  public unRegisterSearchReciverResult() {
    this.searchResultSource = new BehaviorSubject<SearchResult>(SearchResult.IGNORE);
    this.searchResult = this.searchResultSource.asObservable();
  }

  public sendSearchResult(result: SearchResult) {
    this.searchResultSource.next(result);
  }


  //filter
  public registerFilter(func: (filter: string) => void) {
    this.filter.pipe(filter(x => x != this.IGNORE)).subscribe(f => func(f));
  }

  public changeFilter(filter: string) {
    this.filterSource.next(filter);
  }


  //search
  public registerSearch(func: (query: string) => void) {
    this.search.pipe(filter(x => x != this.IGNORE)).subscribe(subResult => func(subResult));
  }

  public sendSearch(query: string) {
    this.searchSource.next(query);
  }
}
