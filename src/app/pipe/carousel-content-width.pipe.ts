import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carouselContentWidth'
})
export class CarouselContentWidthPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    if(value){
      return `translateX(${value}px)`;
    }
    return null;
  }

}
