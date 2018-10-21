import { TestBed, inject } from '@angular/core/testing';

import { ForwardService } from './forward.service';

describe('ForwardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForwardService]
    });
  });

  it('should be created', inject([ForwardService], (service: ForwardService) => {
    expect(service).toBeTruthy();
  }));
});
