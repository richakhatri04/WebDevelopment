import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateSravanComponent } from './donate-sravan.component';

describe('DonateSravanComponent', () => {
  let component: DonateSravanComponent;
  let fixture: ComponentFixture<DonateSravanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateSravanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateSravanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

