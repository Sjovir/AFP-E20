import { TestBed } from '@angular/core/testing';

import { CitizenService } from './citizen.service';

describe('CitizenService', () => {
  let service: CitizenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
