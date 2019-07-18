import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptRichaComponent } from './adopt-richa.component';

describe('AdoptRichaComponent', () => {
  let component: AdoptRichaComponent;
  let fixture: ComponentFixture<AdoptRichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptRichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptRichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
