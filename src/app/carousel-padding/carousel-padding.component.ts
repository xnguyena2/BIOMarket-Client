import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { CRItemInfo } from '../pipe/CRItemInfo';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-carousel-padding',
  templateUrl: './carousel-padding.component.html',
  styleUrls: ['./carousel-padding.component.scss']
})
export class CarouselPaddingComponent implements OnInit {

  readonly MAX_OFFSET = 100;
  readonly CLICK_RANGE = 4;
  readonly NotIndex: number = -1;
  readonly TimeInterVal: number = 5000;

  @Output() clickAtItem = new EventEmitter<number>();

  isMouseDown: boolean = false;
  currentPosX: number = 0;

  currentIndex: number = 1;
  enableTransform: boolean = false;

  transform: number = 0;


  listItem: CRItemInfo[] = [];

  @Input() GalleryMode: boolean = false;


  dragPost: number = 0;
  currentScroll: number = 0;
  dragging: boolean = false;

  constructor(
    private appService: AppService) { }

  ngOnInit(): void {
    if (!this.GalleryMode && this.appService.isBrowser) {
      interval(this.TimeInterVal)
        .subscribe(x => {
          if (!this.isMouseDown) {
            this.goNext();
          }
        });
    }
  }

  setupListItem(list: string[] | null) {
    if (list == null) {
      this.listItem = [];
      return;
    }
    this.currentIndex = 1;
    let listCarouselItem: CRItemInfo[] = list.map(x => new CRItemInfo(x));
    this.listItem = [
      listCarouselItem[list.length - 1],
      ...listCarouselItem,
      listCarouselItem[0]
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
      if (Math.abs(transform) < this.CLICK_RANGE) {
        this.clickAt(this.currentIndex);
      }
      this.enableTranform(false);
    }
  }

  enableTranform(scrollTo: boolean) {
    this.enableTransform = true;
    setTimeout(() => {
      this.enableTransform = false;
      if (this.currentIndex === 0) {
        this.currentIndex = this.listItem.length - 2;
      } else if (this.currentIndex === this.listItem.length - 1) {
        this.currentIndex = 1;
      }
      if (this.GalleryMode && scrollTo) {
        this.scrollToElement(this.currentIndex);
      }
    }, 200);
  }

  validItem(): boolean {
    return this.listItem.length > 1;
  }

  //mouse
  mouseDown(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (!this.validItem() || this.enableTransform || mouse.button != 0) {
      return;
    }
    this.isMouseDown = true;
    this.currentPosX = this.calcMousePositionX(mouse, outerDiv);
  }

  mouseMove(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown) {
      return;
    }
    this.moveItem(this.calcMousePositionX(mouse, outerDiv) - this.currentPosX);
  }

  mouseUp(mouse: MouseEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown) {
      return;
    }
    this.isMouseDown = false;
    this.releaseItem(this.calcMousePositionX(mouse, outerDiv) - this.currentPosX);
  }

  //touch
  validTouch(touch: TouchEvent): boolean {
    if (touch.touches.length > 1) {
      return false;
    }
    return true;
  }
  touchStart(touch: TouchEvent, outerDiv: HTMLElement) {
    if (!this.validItem() || this.enableTransform || !this.validTouch(touch)) {
      return;
    }
    this.isMouseDown = true;
    this.currentPosX = this.calcTouchPositionX(touch, outerDiv);
  }
  touchMove(touch: TouchEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown || !this.validTouch(touch)) {
      this.touchEnd(touch, outerDiv);
      return;
    }
    if (this.isMouseDown) {
      this.moveItem(this.calcTouchPositionX(touch, outerDiv) - this.currentPosX);
    }
  }
  touchEnd(touch: TouchEvent, outerDiv: HTMLElement) {
    if (!this.isMouseDown) {
      return;
    }
    this.isMouseDown = false;
    this.releaseItem(this.transform);
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
    this.enableTranform(true);
  }
  goPre() {
    if (this.listItem.length <= 1 || this.enableTransform) {
      return;
    }
    this.currentIndex = this.preIndex();
    this.enableTranform(true);
  }
  goTo(index: number) {
    if (this.listItem.length <= 1 || this.enableTransform) {
      return;
    }
    this.currentIndex = index;
    this.enableTranform(true);
  }

  isActive(index: number) {
    return this.currentIndex === index || index === 1 && this.currentIndex === this.listItem.length - 1 || index === this.listItem.length - 2 && this.currentIndex === 0 || this.listItem.length === 1;
  }

  getItemName(index: number) {
    return "preview-image-" + index;
  }

  scrollToElement(index: number) {
    document.getElementById(this.getItemName(index))?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  //drag preview
  beginDrag(touch: MouseEvent, container: HTMLElement) {
    this.dragging = true;
    this.currentScroll = container.scrollLeft;
    this.dragPost = this.calcMousePositionX(touch, container);
  }

  drag(touch: MouseEvent, container: HTMLElement) {
    if (!this.dragging)
      return;
    const dx = this.calcMousePositionX(touch, container) - this.dragPost;
    container.scrollLeft = this.currentScroll - dx;
  }

  endDrag() {
    this.dragging = false;
  }

  beginTouchDrag(touch: TouchEvent, container: HTMLElement) {
    this.dragging = true;
    this.currentScroll = container.scrollLeft;
    this.dragPost = this.calcTouchPositionX(touch, container);
  }

  dragTouch(touch: TouchEvent, container: HTMLElement) {
    if (!this.dragging)
      return;
    const dx = this.calcTouchPositionX(touch, container) - this.dragPost;
    container.scrollLeft = this.currentScroll - dx;
  }

  disableDrag(event: DragEvent) {
    event.preventDefault();
  }

  //click in item
  clickAt(index: number) {
    this.clickAtItem?.emit(index);
  }
}
