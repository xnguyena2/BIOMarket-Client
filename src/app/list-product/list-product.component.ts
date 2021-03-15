import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCaretDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AppConfig } from '../config/AppConfig';
import { BeerDetail } from '../object/BeerDetail';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  readonly maxShow = 9;

  faRight = faChevronRight;
  faLeft = faChevronLeft;
  faCaretDown = faCaretDown;

  @ViewChild('filter', { static: false }) select!: ElementRef;

  filterOption = AppConfig.FilterDrop;


  listPage: number[] = [];
  totalResult: number = 0;
  activePage: number = 0;

  @Input() listProduct: BeerDetail[] = [];

  @Input() title: string = 'Kết Quả Tìm Kiếm:';

  @Input() mainTitle: string = 'Sản Phẩm';

  @Input() searchMode: boolean = true;

  @Output() filterChange = new EventEmitter<string>();

  @Output() pageChange = new EventEmitter<number>();

  selection: any;

  constructor() { }

  ngOnInit(): void {
  }

  changeFilter(filter: string) {
    this.filterChange.emit(filter);
  }

  resetSelection() {
    this.select.nativeElement.value = AppConfig.FilterDrop[0].value;
  }

  goNext() {
    if (this.activePage < this.totalResult) {
      this.goPage(this.activePage + 1);
    }
  }

  goPre() {
    if (this.activePage > 1) {
      this.goPage(this.activePage - 1);
    }
  }

  goPage(page: number) {
    if (page === -2) {
      page = this.listPage[2] - 1;
    } else if (page === -1) {
      page = this.listPage[this.listPage.length - 3] + 1;
    }
    this.activePage = page;
    if (this.totalResult <= this.maxShow) {

    } else {
      const upOffset = this.totalResult - page;
      let startIndex = 0;
      if (Math.round(this.maxShow / 2) >= upOffset) {
        startIndex = this.totalResult - this.maxShow + 1;
      } else if (page <= Math.round(this.maxShow / 2)) {
        startIndex = 1;
      } else {
        startIndex = page - Math.round(this.maxShow / 2);
      }
      this.listPage = Array.from({ length: this.maxShow }, (_, i) => {
        if (i === 0) {
          return 1;
        } else if (i === 1) {
          if (startIndex > 1) {
            return -2;
          } else {
            return 2;
          }
        } else if (i === this.maxShow - 2) {
          if (startIndex + i < this.totalResult - 1) {
            return -1;
          } else {
            return this.totalResult - 1;
          }
        } else if (i === this.maxShow - 1) {
          return this.totalResult;
        } else {
          return startIndex + i;
        }
      });
    }

    this.pageChange?.emit(this.activePage - 1);
  }

  setUpPagi(total: number) {
    if (total === 0)
      return;
    this.totalResult = Math.ceil(total / 24);
    this.activePage = 1;
    if (this.totalResult < this.maxShow) {
      this.listPage = Array.from({ length: this.totalResult }, (_, i) => i + 1);
    } else {
      this.listPage = Array.from({ length: this.maxShow }, (_, i) => {
        if (i < this.maxShow - 2) {
          return i + 1;
        } else if (i === this.maxShow - 2) {
          return -1;
        } else {
          return this.totalResult;
        }
      });
    }
  }
}
