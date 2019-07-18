// Developer: Aditya Gadhvi (B00809664) (ad742065@dal.ca)

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAdityaComponent } from './registration-aditya.component';

describe('RegistrationAdityaComponent', () => {
  let component: RegistrationAdityaComponent;
  let fixture: ComponentFixture<RegistrationAdityaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAdityaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAdityaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
