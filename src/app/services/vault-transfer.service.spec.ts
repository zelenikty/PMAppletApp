import { TestBed, inject } from '@angular/core/testing';

import { VaultTransferService } from './vault-transfer.service';

describe('VaultTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VaultTransferService]
    });
  });

  it('should be created', inject([VaultTransferService], (service: VaultTransferService) => {
    expect(service).toBeTruthy();
  }));
});
