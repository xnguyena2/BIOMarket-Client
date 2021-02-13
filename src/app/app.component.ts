import { Component,ViewChild,ElementRef } from '@angular/core';

import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

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

  hoverMenuClass:string[]=["hover-menu-container"];

  constructor(private AppService: AppService){
    this.AppService.registerHideProductMenu(this.click);
  }

  click(){
    console.log("hello");
    this.hoverMenuClass.push('hide-element')
    setTimeout(() => {
      const index = this.hoverMenuClass.indexOf('hide-element', 0);
      if (index > -1) {
        this.hoverMenuClass.splice(index, 1);
     }
    }, 300);
  }
}
