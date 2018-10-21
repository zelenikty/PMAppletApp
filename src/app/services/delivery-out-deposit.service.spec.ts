import { TestBed, inject } from '@angular/core/testing';

import { DeliveryOutDepositService } from './delivery-out-deposit.service';

describe('DeliveryOutDepositService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryOutDepositService]
    });
  });

  it('should be created', inject([DeliveryOutDepositService], (service: DeliveryOutDepositService) => {
    expect(service).toBeTruthy();
  }));
});
