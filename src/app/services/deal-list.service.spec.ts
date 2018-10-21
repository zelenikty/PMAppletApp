import { TestBed, inject } from '@angular/core/testing';

import { DealListService } from './deal-list.service';

describe('DealListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealListService]
    });
  });

  it('should be created', inject([DealListService], (service: DealListService) => {
    expect(service).toBeTruthy();
  }));
});
