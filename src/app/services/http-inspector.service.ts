import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInspectorService implements HttpInterceptor {

  constructor(private loader: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("conntected");
    setTimeout(() => {
      this.loader.isLoading.next(true);
    }, 0);
    return next.handle(req)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.loader.isLoading.next(false);
          }, 0);
        })
      );
  }
}
