import { TestBed, inject } from '@angular/core/testing';

import { RestJsonArrayService } from './restjsonarrayservice.service';
import {HttpClientModule} from '@angular/common/http';

describe('RestJsonArrayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestJsonArrayService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([RestJsonArrayService], (service: RestJsonArrayService) => {
    expect(service).toBeTruthy();
  }));
});
