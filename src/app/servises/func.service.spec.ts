import { TestBed } from '@angular/core/testing';

import { Func.ServiceService } from './func.service';

describe('Func.ServiceService', () => {
  let service: Func.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Func.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
