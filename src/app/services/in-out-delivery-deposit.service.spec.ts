import { TestBed, inject } from '@angular/core/testing';

import { InOutDeliveryDepositService } from './in-out-delivery-deposit.service';

describe('InOutDeliveryDepositService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InOutDeliveryDepositService]
    });
  });

  it('should be created', inject([InOutDeliveryDepositService], (service: InOutDeliveryDepositService) => {
    expect(service).toBeTruthy();
  }));
});
