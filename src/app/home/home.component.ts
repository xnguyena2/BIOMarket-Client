import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../config/AppConfig';

import { APIService } from '../services/api.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hostUrl = AppConfig.HostUrl;

  images: string[] = [];

  constructor(private API: APIService,
    public AppService: AppService) { }

  ngOnInit(): void {
    this.API.LoadBootStrap(result => {
      if (result) {
        this.images = result.carousel;
      }
    });
  }
}
