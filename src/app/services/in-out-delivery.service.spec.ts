import { TestBed, inject } from '@angular/core/testing';

import { InOutDeliveryService } from './in-out-delivery.service';

describe('InOutDeliveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InOutDeliveryService]
    });
  });

  it('should be created', inject([InOutDeliveryService], (service: InOutDeliveryService) => {
    expect(service).toBeTruthy();
  }));
});
