import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateLakshmiComponent } from './donate-lakshmi.component';

describe('DonateLakshmiComponent', () => {
  let component: DonateLakshmiComponent;
  let fixture: ComponentFixture<DonateLakshmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateLakshmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateLakshmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
