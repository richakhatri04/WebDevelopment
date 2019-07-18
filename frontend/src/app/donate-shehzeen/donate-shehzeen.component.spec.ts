import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateShehzeenComponent } from './donate-shehzeen.component';

describe('DonateShehzeenComponent', () => {
  let component: DonateShehzeenComponent;
  let fixture: ComponentFixture<DonateShehzeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateShehzeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateShehzeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
