import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carouselContentLeft'
})
export class CarouselContentLeftPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    if (args[1] <= 1)
      return null;
    return `translateX(calc(-${args[0]}00% + ${value}px))`;
  }
}
