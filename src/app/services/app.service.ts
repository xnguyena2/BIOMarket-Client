import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  hideAllProductMenu:()=>void = ()=>{};

  constructor() { }

  public registerHideProductMenu(fun:()=>void){
    this.hideAllProductMenu = fun;
  }

  public hideMenu(){
    this.hideAllProductMenu();
  }
}
