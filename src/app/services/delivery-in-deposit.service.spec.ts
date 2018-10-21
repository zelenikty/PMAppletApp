import { TestBed, inject } from '@angular/core/testing';

import { DeliveryInDepositService } from './delivery-in-deposit.service';

describe('DeliveryInDepositService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryInDepositService]
    });
  });

  it('should be created', inject([DeliveryInDepositService], (service: DeliveryInDepositService) => {
    expect(service).toBeTruthy();
  }));
});
