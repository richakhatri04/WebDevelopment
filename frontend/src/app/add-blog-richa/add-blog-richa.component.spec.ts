import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogRichaComponent } from './add-blog-richa.component';

describe('AddBlogRichaComponent', () => {
  let component: AddBlogRichaComponent;
  let fixture: ComponentFixture<AddBlogRichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogRichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogRichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
