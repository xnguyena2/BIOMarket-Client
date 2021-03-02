import { Component, OnInit } from '@angular/core';
import { CRItemInfo } from '../pipe/CRItemInfo';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  readonly MAX_OFFSET = 100;
  readonly NotIndex: number = -1;

  isMouseDown: boolean = false;
  currentPosX: number = 0;

  currentIndex: number = 0;
  secondActiveIndex: number = this.NotIndex;
  enableTransform: boolean = false;
  transformIndex: number = this.NotIndex;

  transformTouch: number = 0;

  listItem: CRItemInfo[] = [
    new CRItemInfo(0, "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111"),
    new CRItemInfo(0, "22222222222222222222222222222222222222222222222222222222222222222222222222222222222222"),
    new CRItemInfo(0, "333333333333333333333333333333333333333333333333333333333333333333333333333333333333333")
  ];

  constructor() { }

  ngOnInit(): void {
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
  moveItem(transform: number, parentWidth: number) {
    this.listItem[this.currentIndex].transform = transform;
    if (transform === 0) {
      return;
    }
    if (transform > 0) {
      const preIndex = this.preIndex();
      this.listItem[preIndex].transform = transform - parentWidth;
      if (this.secondActiveIndex != this.NotIndex && this.secondActiveIndex != preIndex) {
        this.listItem[this.secondActiveIndex].transform = parentWidth;
      }
      this.secondActiveIndex = preIndex;
    } else {
      const nextIndex = this.nextIndex();
      this.listItem[nextIndex].transform = parentWidth + transform;
      if (this.secondActiveIndex != this.NotIndex && this.secondActiveIndex != nextIndex) {
        this.listItem[this.secondActiveIndex].transform = parentWidth;
      }
      this.secondActiveIndex = nextIndex;
    }
  }

  releaseItem(transform: number, parentWidth: number) {
    if (transform > this.MAX_OFFSET) {
      this.listItem[this.secondActiveIndex].transform = 0;
      this.listItem[this.currentIndex].transform = parentWidth;
      this.transformIndex = this.currentIndex;
      this.currentIndex = this.secondActiveIndex;
    } else if (transform < -this.MAX_OFFSET) {
      this.listItem[this.secondActiveIndex].transform = 0;
      this.listItem[this.currentIndex].transform = -parentWidth;
      this.transformIndex = this.currentIndex;
      this.currentIndex = this.secondActiveIndex;
    } else if (transform > 0) {
      this.listItem[this.secondActiveIndex].transform = -parentWidth;
      this.listItem[this.currentIndex].transform = 0;
      this.transformIndex = this.secondActiveIndex;
    } else {
      if (this.secondActiveIndex !== this.NotIndex) {
        this.listItem[this.secondActiveIndex].transform = parentWidth;
      }
      this.listItem[this.currentIndex].transform = 0;
      this.transformIndex = this.secondActiveIndex;
    }
    this.secondActiveIndex = this.NotIndex;
    this.enableTransform = true;
    setTimeout(() => {
      this.enableTransform = false;
    }, 200);
  }

  //mouse
  mouseDown(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (this.listItem.length <= 1 || this.enableTransform) {
      return;
    }
    this.isMouseDown = true;
    this.currentPosX = this.calcMousePositionX(mouse, outerDiv);
  }

  mouseMove(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (this.isMouseDown) {
      this.moveItem(this.calcMousePositionX(mouse, outerDiv) - this.currentPosX, outerDiv.getBoundingClientRect().width);
    }
  }

  mouseUp(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown) {
      return;
    }
    this.isMouseDown = false;
    this.releaseItem(this.calcMousePositionX(mouse, outerDiv) - this.currentPosX, outerDiv.getBoundingClientRect().width);
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
      this.moveItem(this.transformTouch, outerDiv.getBoundingClientRect().width);
    }
  }
  touchEnd(touch: TouchEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown) {
      return;
    }
    this.isMouseDown = false;
    this.releaseItem(this.transformTouch, outerDiv.getBoundingClientRect().width);
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
}
