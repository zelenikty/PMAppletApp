import { TestBed, inject } from '@angular/core/testing';

import { SpotUnallocatedService } from './spot-unallocated.service';

describe('SpotUnallocatedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotUnallocatedService]
    });
  });

  it('should be created', inject([SpotUnallocatedService], (service: SpotUnallocatedService) => {
    expect(service).toBeTruthy();
  }));
});
