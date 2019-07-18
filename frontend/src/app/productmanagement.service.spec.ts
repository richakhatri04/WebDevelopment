import {} from 'jasmine';
import { TestBed } from '@angular/core/testing';

import { ProductmanagementService } from './productmanagement.service';

describe('ProductmanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductmanagementService = TestBed.get(ProductmanagementService);
    expect(service).toBeTruthy();
  });
});
