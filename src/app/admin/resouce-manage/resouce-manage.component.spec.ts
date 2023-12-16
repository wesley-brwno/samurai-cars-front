import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResouceManageComponent } from './resouce-manage.component';

describe('ResouceManageComponent', () => {
  let component: ResouceManageComponent;
  let fixture: ComponentFixture<ResouceManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResouceManageComponent]
    });
    fixture = TestBed.createComponent(ResouceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
