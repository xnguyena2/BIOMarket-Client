import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../config/AppConfig';
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

  listProduct: BeerDetail[] = [];

  hostUrl = AppConfig.HostUrl;


  constructor(private route: ActivatedRoute,
    private APP: AppService,
    private APIService: APIService) { }

  ngOnDestroy(): void {
    console.log("destroy search component");
    this.APP.unRegisterSearchReciverResult();
  }

  ngOnInit(): void {
    this.APP.searchResult.subscribe(result=>{
      this.onSearchResult(result);
    });
    const query = this.route.snapshot.paramMap.get('query');
    if(query!=null){
      this.APIService.SearchBeer(new SearchQuery(query, 0, 24), result => {
        this.listProduct = result.result;
      });
    }
  }

  onSearchResult(result: SearchResult) {
    this.listProduct = result.result;
  }
}
