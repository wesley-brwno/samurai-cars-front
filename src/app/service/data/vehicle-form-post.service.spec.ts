import { TestBed } from '@angular/core/testing';

import { VehicleFormPostService } from './vehicle-form-post.service';

describe('VehicleFormPostService', () => {
  let service: VehicleFormPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleFormPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
