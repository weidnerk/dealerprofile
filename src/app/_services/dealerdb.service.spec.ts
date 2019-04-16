import { TestBed, inject } from '@angular/core/testing';

import { DealerdbService } from './dealerdb.service';

describe('DealerdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealerdbService]
    });
  });

  it('should be created', inject([DealerdbService], (service: DealerdbService) => {
    expect(service).toBeTruthy();
  }));
});
