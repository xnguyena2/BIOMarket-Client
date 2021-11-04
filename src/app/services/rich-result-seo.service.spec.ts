import { TestBed } from '@angular/core/testing';

import { RichResultSEOService } from './rich-result-seo.service';

describe('RichResultSEOService', () => {
  let service: RichResultSEOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichResultSEOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
