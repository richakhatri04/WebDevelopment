import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SravanFeedbackComponent } from './sravan-feedback.component';

describe('SravanFeedbackComponent', () => {
  let component: SravanFeedbackComponent;
  let fixture: ComponentFixture<SravanFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SravanFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SravanFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
