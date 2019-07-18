import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageSravanComponent } from './homepage-sravan.component';

describe('HomepageSravanComponent', () => {
  let component: HomepageSravanComponent;
  let fixture: ComponentFixture<HomepageSravanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageSravanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageSravanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
