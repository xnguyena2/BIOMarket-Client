import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '../config/AppConfig';
import { BeerDetail } from '../object/BeerDetail';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

hostUrl:string = AppConfig.HostUrl;

  @Input() listProduct:BeerDetail[] = [];

  @Input() title:string = 'Kết Quả Tìm Kiếm:';

  @Input() searchMode:boolean = true;

  sortBy:any = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
