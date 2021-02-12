import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config/AppConfig';

import { APIService } from '../services/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hostUrl = AppConfig.HostUrl;

  images: string[] = [];

  constructor(private API: APIService) { }

  ngOnInit(): void {
    this.API.LoadBootStrap(result => {
      this.images = result.carousel;
    });
  }

}
