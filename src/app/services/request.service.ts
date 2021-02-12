import { Injectable } from '@angular/core';


import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }


  get(url:string): Observable<HttpEvent<any>> {

    const req = new HttpRequest('GET', `${url}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  post(url:string, submitData: any): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', `${url}`, submitData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
