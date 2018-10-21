import { TestBed, inject } from '@angular/core/testing';

import { PmTabService } from './pm-tab.service';

describe('PmTabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmTabService]
    });
  });

  it('should be created', inject([PmTabService], (service: PmTabService) => {
    expect(service).toBeTruthy();
  }));
});
