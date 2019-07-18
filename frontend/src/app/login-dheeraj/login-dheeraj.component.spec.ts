import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDheerajComponent } from './login-dheeraj.component';

describe('LoginDheerajComponent', () => {
  let component: LoginDheerajComponent;
  let fixture: ComponentFixture<LoginDheerajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDheerajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDheerajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
