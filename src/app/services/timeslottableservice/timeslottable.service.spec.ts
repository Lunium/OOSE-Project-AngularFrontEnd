import { TestBed, inject } from '@angular/core/testing';

import { TimeslottableService } from './timeslottable.service';

describe('TimeslottableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeslottableService]
    });
  });

  it('should be created', inject([TimeslottableService], (service: TimeslottableService) => {
    expect(service).toBeTruthy();
  }));
});
