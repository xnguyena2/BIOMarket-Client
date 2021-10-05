import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(
    private appServices: AppService,) {
    this.appServices.changeScrollToTop(true);
  }

  ngOnInit(): void {
  }

}
