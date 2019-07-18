import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSravanComponent } from './faq-sravan.component';

describe('FaqSravanComponent', () => {
  let component: FaqSravanComponent;
  let fixture: ComponentFixture<FaqSravanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqSravanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSravanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
