import { TestBed } from '@angular/core/testing';

import { VehiclePageableService } from './vehicle-pageable.service';

describe('VehiclePageableService', () => {
  let service: VehiclePageableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclePageableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
