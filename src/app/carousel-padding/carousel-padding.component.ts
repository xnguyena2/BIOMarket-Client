import { Component, Input, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CRItemInfo } from '../pipe/CRItemInfo';

@Component({
  selector: 'app-carousel-padding',
  templateUrl: './carousel-padding.component.html',
  styleUrls: ['./carousel-padding.component.scss']
})
export class CarouselPaddingComponent implements OnInit {

  readonly MAX_OFFSET = 100;
  readonly NotIndex: number = -1;

  readonly testData: CRItemInfo[] = [
    new CRItemInfo(0, "https://i.imgur.com/smfXfKm.jpg"),
    new CRItemInfo(0, "https://i.imgur.com/lpmKmHQ.jpg"),
    new CRItemInfo(0, "https://i.imgur.com/rXLVrDF.jpg"),
    new CRItemInfo(0, "https://i.imgur.com/smfXfKm.jpg"),
    new CRItemInfo(0, "https://i.imgur.com/lpmKmHQ.jpg")
  ]


  faRight = faChevronRight;
  faLeft = faChevronLeft;

  isMouseDown: boolean = false;
  currentPosX: number = 0;

  currentIndex: number = 1;
  enableTransform: boolean = false;

  transform: number = 0;
  transformTouch: number = 0;


  listItem: CRItemInfo[] = this.testData;

  constructor() { }

  ngOnInit(): void {
  }

  setupListItem(list: CRItemInfo[]) {
    this.listItem = [
      list[0],
      ...list,
      list[list.length]
    ];
  }

  //mouse event handle
  calcMousePositionX(mouse: MouseEvent, outerDiv: HTMLElement): number {
    const bounds = outerDiv.getBoundingClientRect();
    const posX = mouse.clientX - bounds.left;
    //const posY = mouse.clientY - bounds.top;
    return posX;
  }

  calcTouchPositionX(touch: TouchEvent, outerDiv: HTMLElement): number {
    const t: Touch = touch.touches[0];
    const bounds = outerDiv.getBoundingClientRect();
    const posX = t.clientX - bounds.left;
    //const posY = mouse.clientY - bounds.top;
    return posX;
  }

  //move carousel item
  moveItem(transform: number) {
    this.transform = transform;
  }

  releaseItem(transform: number) {
    this.transform = 0;
    if (transform > this.MAX_OFFSET) {
      this.goPre();
    } else if (transform < -this.MAX_OFFSET) {
      this.goNext();
    } else {
      this.enableTranform();
    }
  }

  enableTranform() {
    this.enableTransform = true;
    setTimeout(() => {
      this.enableTransform = false;
      if (this.currentIndex === 0) {
        this.currentIndex = this.listItem.length - 2;
      } else if (this.currentIndex === this.listItem.length - 1) {
        this.currentIndex = 1;
      }
    }, 200);
  }

  //mouse
  mouseDown(mouse: MouseEvent, outerDiv: HTMLElement) {
    console.log("down");

    if (this.listItem.length <= 1 || this.enableTransform) {
      return;
    }
    this.isMouseDown = true;
    this.currentPosX = this.calcMousePositionX(mouse, outerDiv);
  }

  mouseMove(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (this.isMouseDown) {
      this.moveItem(this.calcMousePositionX(mouse, outerDiv) - this.currentPosX);
    }
  }

  mouseUp(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown) {
      return;
    }
    this.isMouseDown = false;
    this.releaseItem(this.calcMousePositionX(mouse, outerDiv) - this.currentPosX);
  }

  //touch
  validTouch(touch: TouchEvent, outerDiv: HTMLElement): boolean {
    if (touch.touches.length > 1 && !this.enableTransform) {
      this.touchEnd(touch, outerDiv);
      return false;
    }
    return true;
  }
  touchStart(touch: TouchEvent, outerDiv: HTMLElement) {
    if (!this.validTouch(touch, outerDiv)) {
      return;
    }
    this.isMouseDown = true;
    this.currentPosX = this.calcTouchPositionX(touch, outerDiv);
  }
  touchMove(touch: TouchEvent, outerDiv: HTMLElement) {
    if (!this.validTouch(touch, outerDiv)) {
      return;
    }
    if (this.isMouseDown) {
      this.transformTouch = this.calcTouchPositionX(touch, outerDiv) - this.currentPosX;
      this.moveItem(this.transformTouch);
    }
  }
  touchEnd(touch: TouchEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown) {
      return;
    }
    this.isMouseDown = false;
    this.releaseItem(this.transformTouch);
  }

  //manage index
  nextIndex() {
    if (this.listItem.length <= 1) {
      return this.NotIndex;
    }
    if (this.currentIndex >= this.listItem.length - 1) {
      return 0
    }
    else {
      return this.currentIndex + 1;
    }
  }

  preIndex() {
    if (this.listItem.length <= 1) {
      return this.NotIndex;
    }
    if (this.currentIndex <= 0) {
      return this.listItem.length - 1;
    }
    else {
      return this.currentIndex - 1;
    }
  }

  //go next or pre
  goNext() {
    if (this.listItem.length <= 1 || this.enableTransform) {
      return;
    }
    this.currentIndex = this.nextIndex();
    this.enableTranform();
  }
  goPre() {
    if (this.listItem.length <= 1 || this.enableTransform) {
      return;
    }
    this.currentIndex = this.preIndex();
    this.enableTranform();
  }
}
