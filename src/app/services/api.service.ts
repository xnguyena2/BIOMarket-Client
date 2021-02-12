import { Injectable, isDevMode } from '@angular/core';
import { BootStrap } from '../object/BootStrap';

import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private requestServices: RequestService,) { }

  public LoadBootStrap(cb: (result: BootStrap) => void) {
    if (isDevMode()) {
      cb(BootStrap.TestData);
    } else {
      cb(new BootStrap());
    }
  }
}
