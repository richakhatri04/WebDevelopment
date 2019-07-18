import { TestBed } from '@angular/core/testing';

import { PetmanagementService } from './petmanagement.service';

describe('PetmanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetmanagementService = TestBed.get(PetmanagementService);
    expect(service).toBeTruthy();
  });
});
