import { TestBed } from '@angular/core/testing';

import { OrdermanagmentService } from './ordermanagment.service';

describe('OrdermanagmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdermanagmentService = TestBed.get(OrdermanagmentService);
    expect(service).toBeTruthy();
  });
});
