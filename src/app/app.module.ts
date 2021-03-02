import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselPositionTransformPipe } from './pipe/carousel-position-transform.pipe';
import { CarouselPaddingComponent } from './carousel-padding/carousel-padding.component';
import { CarouselContentWidthPipe } from './pipe/carousel-content-width.pipe';
import { CarouselContentLeftPipe } from './pipe/carousel-content-left.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListProductComponent,
    SearchComponent,
    ProductDetailComponent,
    CarouselComponent,
    CarouselPositionTransformPipe,
    CarouselPaddingComponent,
    CarouselContentWidthPipe,
    CarouselContentLeftPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
