import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselPaddingComponent } from './carousel-padding/carousel-padding.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:query',
    component: SearchComponent
  },
  {
    path: 'detail/:productID',
    component: ProductDetailComponent
  },
  {
    path: 'cr',
    component: CarouselPaddingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
