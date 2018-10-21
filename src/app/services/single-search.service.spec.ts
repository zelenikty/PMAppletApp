import { TestBed, inject } from '@angular/core/testing';

import { SingleSearchService } from './single-search.service';

describe('SingleSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleSearchService]
    });
  });

  it('should be created', inject([SingleSearchService], (service: SingleSearchService) => {
    expect(service).toBeTruthy();
  }));
});
