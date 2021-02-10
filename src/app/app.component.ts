import { Component } from '@angular/core';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BIOMarket | Chuyên Bia Nhập Khẩu';
  fashoppingcart = faShoppingCart;
  faSearch = faSearch;
}
