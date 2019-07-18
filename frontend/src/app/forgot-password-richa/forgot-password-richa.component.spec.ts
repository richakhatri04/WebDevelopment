import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordRichaComponent } from './forgot-password-richa.component';

describe('ForgotPasswordRichaComponent', () => {
  let component: ForgotPasswordRichaComponent;
  let fixture: ComponentFixture<ForgotPasswordRichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordRichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordRichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
