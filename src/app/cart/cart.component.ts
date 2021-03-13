import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  faLeft = faChevronLeft;
  faClose = faTimes;

  totalPrice: number = 1000;

  listProduct: string[] = ["","","",""];

  constructor() { }

  ngOnInit(): void {
  }

}
