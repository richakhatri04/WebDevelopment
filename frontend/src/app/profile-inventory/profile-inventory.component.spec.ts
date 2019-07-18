import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInventoryComponent } from './profile-inventory.component';


describe('ProfileInventoryComponent', () => {
  let component: ProfileInventoryComponent;
  let fixture: ComponentFixture<ProfileInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
