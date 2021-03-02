import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private Api: APIService,) { }

  ngOnInit(): void {
    const productID = this.route.snapshot.paramMap.get('productID');
    if (productID !== null) {
      console.log(productID);
      this.Api.GetProductDetail(productID, product =>{
        if(product){
          console.log(product);
        }
      });
    }
  }
}
