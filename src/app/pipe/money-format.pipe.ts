import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat'
})
export class MoneyFormatPipe implements PipeTransform {
  formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

  transform(value: unknown, ...args: unknown[]): unknown {
    return this.formatter.format(Number(value));
  }

}
