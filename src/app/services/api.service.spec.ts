import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { APIService } from './api.service';
import { SearchQuery } from '../object/SearchQuery';

describe('APIService', () => {
  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  let service: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('query bootstrap', () => {
    service.LoadBootStrap(result => {
      expect(result.carousel.length).toEqual(4);
    });
  });

  it('search test', (done) => {
    service.SearchBeer(new SearchQuery('tiger', 0, 1000, ''), result => {
      expect(result.count).toEqual(4);
      done();
    });
  });
});
