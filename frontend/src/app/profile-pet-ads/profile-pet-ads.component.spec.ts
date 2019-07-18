import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePetAdsComponent } from './profile-pet-ads.component';

describe('ProfilePetAdsComponent', () => {
  let component: ProfilePetAdsComponent;
  let fixture: ComponentFixture<ProfilePetAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePetAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePetAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
