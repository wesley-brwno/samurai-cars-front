import { TestBed } from '@angular/core/testing';

import { VehicleFormService } from './vehicle-form-post.service';

describe('VehicleFormPostService', () => {
  let service: VehicleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
