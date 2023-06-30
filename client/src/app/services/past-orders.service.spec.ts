import { TestBed } from '@angular/core/testing';

import { PastOrdersService } from './past-orders.service';

describe('PastOrdersService', () => {
  let service: PastOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
