import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutsComponent } from './checkouts/checkouts.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component'
import { ThankfullComponent } from './thankfull/thankfull.component';

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
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkouts',
    component: CheckoutsComponent
  },
  {
    path: 'thankfull',
    component: ThankfullComponent
  },
  { path: 'guide', loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule) },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
