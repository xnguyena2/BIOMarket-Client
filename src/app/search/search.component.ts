import { Component, OnInit, ViewChild } from '@angular/core';
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
export class SearchComponent implements OnInit {
  readonly noFilter: string = '';
  readonly noPage: number = -1;
  readonly maxResult: number = 24;

  @ViewChild(ListProductComponent) private listProductComponent!: ListProductComponent;

  listProduct: BeerDetail[] = [];

  searchTitle: string = '';


  searchWithFilter: (filter: string) => void = defaultArg => {
    console.log("Just Init!");
  };

  searchWithPaging: (page: number) => void = defaultArg => {
    console.log("Just Init!");
  };

  constructor(private route: ActivatedRoute,
    private appServices: AppService,
    private APIService: APIService,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const query = params.query;
        if (query !== null) {
          console.log(query);
          let category = AppConfig.CatetoryDrop.find(x => x.value === query);
          if (category !== undefined) {
            this.appServices.changeTitlePage(category.pageTitle);
          }
          this.search(query, this.noFilter, this.noPage);
        }
      }
    );
  }

  search(value: string, filter: string, page: number) {
    if (value === '') {
      if (this.listProduct !== []) {
        this.listProduct = [];
        const emptyResult = new SearchResult();
        emptyResult.isResetFilter = this.isNoFilter(filter);
        this.onSearchResult(emptyResult);
      }
    } else {
      this.APIService.SearchBeer(new SearchQuery(value, this.isNoPage(page) ? 0 : page, this.maxResult, filter), result => {
        if (result) {
          this.searchWithFilter = function (newFilter: string): void {
            this.search(value, newFilter, this.noPage);
          }
          this.searchWithPaging = function (nextPage: number) {
            this.search(value, filter, nextPage);
          }
          result.isResetFilter = this.isNoFilter(filter);
          result.isResetPage = this.isNoPage(page);
          result.searchTxt = value;
          this.onSearchResult(result);
        }
      });
    }
  }

  isNoFilter(filter: string) {
    return filter === this.noFilter
  }

  isNoPage(page: number) {
    return page === this.noPage;
  }

  onSearchResult(result: SearchResult) {
    this.appServices.changeScrollToTop(true);
    this.listProduct = result.result;
    this.APIService.validListProduct(this.listProduct);
    if (result.isResetFilter) {
      this.listProductComponent?.resetSelection();
    }
    if (result.isResetPage) {
      console.log("reset page");
      this.listProductComponent?.setUpPagi(result.count);
    }
    let searchT = '';
    if (result.searchTxt === 'all') {
      searchT = 'Bán Chạy Nhất:';//'Tất Cả Sản Phẩm:'
    } else {
      AppConfig.CatetoryDrop.filter(category => category.value === result.searchTxt).map(ct => searchT = ct.title + ':');
    }
    if (searchT === '') {
      if (result.count === 0) {
        searchT = `Không Tìm Thấy: ${result.searchTxt}`;
      } else {
        searchT = `Kết Quả Tìm Kiếm: ${result.searchTxt} (${result.count})`;
      }
    }
    this.searchTitle = searchT;
  }

  filterChange(filter: string) {
    this.searchWithFilter(filter);
  }

  pageChange(page: number) {
    this.searchWithPaging(page);
  }
}
