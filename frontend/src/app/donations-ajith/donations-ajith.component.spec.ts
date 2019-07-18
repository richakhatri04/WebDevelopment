import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsAjithComponent } from './donations-ajith.component';

describe('DonationsAjithComponent', () => {
  let component: DonationsAjithComponent;
  let fixture: ComponentFixture<DonationsAjithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationsAjithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsAjithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
