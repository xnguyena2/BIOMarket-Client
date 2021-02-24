import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResult } from '../object/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private searchResultSource = new BehaviorSubject(new SearchResult());
  searchResult = this.searchResultSource.asObservable();

  constructor() { }

  public registerSearchReciverResult(func: (result: SearchResult) => void) {
    this.searchResult.subscribe(subResult=>func(subResult));
  }

  public unRegisterSearchReciverResult() {
    this.searchResultSource = new BehaviorSubject(new SearchResult());
    this.searchResult = this.searchResultSource.asObservable();
  }

  public sendSearchResult(result: SearchResult) {
    this.searchResultSource.next(result);
  }
}
