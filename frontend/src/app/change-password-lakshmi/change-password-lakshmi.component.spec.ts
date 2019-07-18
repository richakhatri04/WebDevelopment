import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordLakshmiComponent } from './change-password-lakshmi.component';

describe('ChangePasswordLakshmiComponent', () => {
  let component: ChangePasswordLakshmiComponent;
  let fixture: ComponentFixture<ChangePasswordLakshmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordLakshmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordLakshmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
