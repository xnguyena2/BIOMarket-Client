import { Component,ViewChild,ElementRef } from '@angular/core';

import { faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SearchQuery } from './object/SearchQuery';
import { APIService } from './services/api.service';

import {AppService} from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BIOMarket | Chuyên Bia Nhập Khẩu';
  fashoppingcart = faShoppingCart;
  faSearch = faSearch;
  faClose = faTimes;

  hoverMenuClass:string[]=[""];

  listResult:string[] = ['1', '2', '3'];

  constructor(private AppService: AppService,
    private APIService:APIService){
    this.AppService.registerHideProductMenu(this.hideProductMenu);
  }

  onSearchEnter(value: string) {
    console.log(value);
    this.APIService.SearchBeer(new SearchQuery(value, 0, 10), result =>{

    });
  }

  onSearch(value: string) {
    //console.log(value);
  }

  hideProductMenu(){
    this.hoverMenuClass.push('hide-element')
    setTimeout(() => {
      const index = this.hoverMenuClass.indexOf('hide-element', 0);
      if (index > -1) {
        this.hoverMenuClass.splice(index, 1);
     }
    }, 300);
  }
}
