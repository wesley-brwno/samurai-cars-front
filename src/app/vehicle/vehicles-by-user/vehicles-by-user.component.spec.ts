import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesByUserComponent } from './vehicles-by-user.component';

describe('VehiclesByUserComponent', () => {
  let component: VehiclesByUserComponent;
  let fixture: ComponentFixture<VehiclesByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesByUserComponent]
    });
    fixture = TestBed.createComponent(VehiclesByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
