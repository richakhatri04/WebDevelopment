import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageShehzeenComponent } from './homepage-shehzeen.component';

describe('HomepageShehzeenComponent', () => {
  let component: HomepageShehzeenComponent;
  let fixture: ComponentFixture<HomepageShehzeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageShehzeenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageShehzeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
