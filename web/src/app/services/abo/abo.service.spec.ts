import {TestBed} from '@angular/core/testing';

import {AboService} from './abo.service';

describe('AboService', () => {
  let service: AboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
