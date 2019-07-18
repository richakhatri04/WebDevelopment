import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularOrderManageComponent } from './particular-order-manage.component';

describe('ParticularOrderManageComponent', () => {
  let component: ParticularOrderManageComponent;
  let fixture: ComponentFixture<ParticularOrderManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularOrderManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularOrderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
