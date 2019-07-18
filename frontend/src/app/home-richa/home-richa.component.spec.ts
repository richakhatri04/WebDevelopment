import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRichaComponent } from './home-richa.component';

describe('HomeRichaComponent', () => {
  let component: HomeRichaComponent;
  let fixture: ComponentFixture<HomeRichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
