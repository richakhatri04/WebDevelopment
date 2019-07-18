import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordLakshmiComponent } from './forgotpassword-lakshmi.component';

describe('ForgotpasswordLakshmiComponent', () => {
  let component: ForgotpasswordLakshmiComponent;
  let fixture: ComponentFixture<ForgotpasswordLakshmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordLakshmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordLakshmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
