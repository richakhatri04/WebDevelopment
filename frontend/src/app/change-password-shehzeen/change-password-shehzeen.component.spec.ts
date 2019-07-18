import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordShehzeenComponent } from './change-password-shehzeen.component';

describe('ChangePasswordShehzeenComponent', () => {
  let component: ChangePasswordShehzeenComponent;
  let fixture: ComponentFixture<ChangePasswordShehzeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordShehzeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordShehzeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
