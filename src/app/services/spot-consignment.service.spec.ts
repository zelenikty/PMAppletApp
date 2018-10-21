import { TestBed, inject } from '@angular/core/testing';

import { SpotConsignmentService } from './spot-consignment.service';

describe('SpotConsignmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotConsignmentService]
    });
  });

  it('should be created', inject([SpotConsignmentService], (service: SpotConsignmentService) => {
    expect(service).toBeTruthy();
  }));
});
