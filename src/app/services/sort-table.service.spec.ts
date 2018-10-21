import { TestBed, inject } from '@angular/core/testing';

import { SortTableService } from './sort-table.service';

describe('SortTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortTableService]
    });
  });

  it('should be created', inject([SortTableService], (service: SortTableService) => {
    expect(service).toBeTruthy();
  }));
});
