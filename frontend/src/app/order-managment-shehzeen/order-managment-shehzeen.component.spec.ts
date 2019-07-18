import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagmentShehzeenComponent } from './order-managment-shehzeen.component';

describe('OrderManagmentShehzeenComponent', () => {
  let component: OrderManagmentShehzeenComponent;
  let fixture: ComponentFixture<OrderManagmentShehzeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderManagmentShehzeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagmentShehzeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
