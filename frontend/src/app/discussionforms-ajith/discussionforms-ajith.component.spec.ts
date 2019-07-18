import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionformsAjithComponent } from './discussionforms-ajith.component';

describe('DiscussionformsAjithComponent', () => {
  let component: DiscussionformsAjithComponent;
  let fixture: ComponentFixture<DiscussionformsAjithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionformsAjithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionformsAjithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
