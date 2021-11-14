import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'noSanitize'
})
export class NoSanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {

  }

  transform(html: unknown, ...args: unknown[]): unknown {
    if (html) {
      return this.domSanitizer.bypassSecurityTrustHtml(String(html));
    }
    return null;
  }

}
