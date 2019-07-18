//Developer - Dheeraj Varshney B00808467 dh301823@dal.ca
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyadoptdogComponent } from './whyadoptdog.component';

describe('WhyadoptdogComponent', () => {
  let component: WhyadoptdogComponent;
  let fixture: ComponentFixture<WhyadoptdogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyadoptdogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyadoptdogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
