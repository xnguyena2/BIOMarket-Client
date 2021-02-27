import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../config/AppConfig';
import { ListProductComponent } from '../list-product/list-product.component';
import { BeerDetail } from '../object/BeerDetail';
import { SearchQuery } from '../object/SearchQuery';
import { SearchResult } from '../object/SearchResult';
import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild(ListProductComponent) private listProductComponent!: ListProductComponent;

  listProduct: BeerDetail[] = [];

  hostUrl = AppConfig.HostUrl;


  constructor(private route: ActivatedRoute,
    private APP: AppService,
    private scroll: ViewportScroller) { }

  ngOnDestroy(): void {
    console.log("destroy search component");
    this.APP.unRegisterSearchReceiverResult();
  }

  ngOnInit(): void {
    this.APP.registerSearchReceiverResult(result => {
      this.onSearchResult(result);
    });
    const query = this.route.snapshot.paramMap.get('query');
    if (query !== null) {
      this.APP.sendSearch(query);
    }
  }

  onSearchResult(result: SearchResult) {
    this.scroll.scrollToPosition([0,0]);
    this.listProduct = result.result;
    if(result.isResetFilter){
      this.listProductComponent.resetSelection();
    }
    if(result.isResetPage){
      console.log("reset page");
      this.listProductComponent.setUpPagi(result.count);
    }
  }

  filterChange(filter: string) {
    this.APP.changeFilter(filter);
  }

  pageChange(page: number){
    this.APP.changePage(page);
  }
}
