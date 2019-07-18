// Developer: Aditya Gadhvi (B00809664) (ad742065@dal.ca)

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAdoptCatComponent } from './why-adopt-cat.component';

describe('WhyAdoptCatComponent', () => {
  let component: WhyAdoptCatComponent;
  let fixture: ComponentFixture<WhyAdoptCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyAdoptCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyAdoptCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
