import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoryRichaComponent } from './add-story-richa.component';

describe('AddStoryRichaComponent', () => {
  let component: AddStoryRichaComponent;
  let fixture: ComponentFixture<AddStoryRichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoryRichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoryRichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
