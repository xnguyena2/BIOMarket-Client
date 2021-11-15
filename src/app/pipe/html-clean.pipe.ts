import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '../services/app.service';

@Pipe({
  name: 'htmlClean'
})
export class HtmlCleanPipe implements PipeTransform {
  constructor(
    private appService: AppService,) {

  }

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return this.appService.extractContent(String(value), String(args[0]));
    }
    return null;
  }

}
