import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CarouselPaddingComponent } from './carousel-padding/carousel-padding.component';
import { CarouselContentWidthPipe } from './pipe/carousel-content-width.pipe';
import { CarouselContentLeftPipe } from './pipe/carousel-content-left.pipe';
import { CartComponent } from './cart/cart.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListProductComponent,
    SearchComponent,
    ProductDetailComponent,
    CarouselPaddingComponent,
    CarouselContentWidthPipe,
    CarouselContentLeftPipe,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
