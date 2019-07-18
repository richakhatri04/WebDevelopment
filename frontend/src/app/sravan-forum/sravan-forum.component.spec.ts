import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SravanForumComponent } from './sravan-forum.component';

describe('SravanForumComponent', () => {
  let component: SravanForumComponent;
  let fixture: ComponentFixture<SravanForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SravanForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SravanForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
