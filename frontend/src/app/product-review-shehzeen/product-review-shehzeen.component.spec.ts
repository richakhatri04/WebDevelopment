import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewShehzeenComponent } from './product-review-shehzeen.component';

describe('ProductReviewShehzeenComponent', () => {
  let component: ProductReviewShehzeenComponent;
  let fixture: ComponentFixture<ProductReviewShehzeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReviewShehzeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewShehzeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
