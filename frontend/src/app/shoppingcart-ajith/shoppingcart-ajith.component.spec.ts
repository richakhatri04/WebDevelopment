import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartAjithComponent } from './shoppingcart-ajith.component';

describe('ShoppingcartAjithComponent', () => {
  let component: ShoppingcartAjithComponent;
  let fixture: ComponentFixture<ShoppingcartAjithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingcartAjithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartAjithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
