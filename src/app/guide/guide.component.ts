import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
