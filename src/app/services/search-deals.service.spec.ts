import { TestBed, inject } from '@angular/core/testing';

import { SearchDealsService } from './search-deals.service';

describe('SearchDealsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchDealsService]
    });
  });

  it('should be created', inject([SearchDealsService], (service: SearchDealsService) => {
    expect(service).toBeTruthy();
  }));
});
