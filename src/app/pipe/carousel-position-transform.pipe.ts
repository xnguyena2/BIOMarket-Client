import { Pipe, PipeTransform } from '@angular/core';
import { CRItemInfo } from './CRItemInfo';

@Pipe({
  name: 'carouselPositionTransform'
})
export class CarouselPositionTransformPipe implements PipeTransform {

  transform(value: unknown, ...args: CRItemInfo[]): unknown {
    if(value){
      if(args[0]){
        return `${args[0].transform}px`;
      }
    }
    return null;
  }
}
