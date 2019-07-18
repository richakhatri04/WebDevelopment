import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveContentComponent } from './admin-approve-content.component';

describe('AdminApproveContentComponent', () => {
  let component: AdminApproveContentComponent;
  let fixture: ComponentFixture<AdminApproveContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApproveContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApproveContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
