import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { MoneyFormatPipe } from './pipe/money-format.pipe';
import { CheckoutsComponent } from './checkouts/checkouts.component';
import { ThankfullComponent } from './thankfull/thankfull.component';
import { HttpInspectorService } from './services/http-inspector.service';

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
    CartComponent,
    MoneyFormatPipe,
    CheckoutsComponent,
    ThankfullComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CookieService, { provide: HTTP_INTERCEPTORS, useClass: HttpInspectorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
