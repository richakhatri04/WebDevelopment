import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogStoriesRichaComponent } from './blog-stories-richa.component';

describe('BlogStoriesRichaComponent', () => {
  let component: BlogStoriesRichaComponent;
  let fixture: ComponentFixture<BlogStoriesRichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogStoriesRichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogStoriesRichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
