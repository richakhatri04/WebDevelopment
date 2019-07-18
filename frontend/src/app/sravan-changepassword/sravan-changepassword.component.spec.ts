import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SravanChangepasswordComponent } from './sravan-changepassword.component';

describe('SravanChangepasswordComponent', () => {
  let component: SravanChangepasswordComponent;
  let fixture: ComponentFixture<SravanChangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SravanChangepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SravanChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
