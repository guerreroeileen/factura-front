import { TestBed } from '@angular/core/testing';

import { FacturaServiceService } from './factura-service.service';

describe('FacturaServiceService', () => {
  let service: FacturaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
