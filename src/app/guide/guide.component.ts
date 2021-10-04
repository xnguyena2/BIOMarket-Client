import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuideComponent implements OnInit {

  constructor(
    private scroll: ViewportScroller,) { }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0,0]);
  }

}
