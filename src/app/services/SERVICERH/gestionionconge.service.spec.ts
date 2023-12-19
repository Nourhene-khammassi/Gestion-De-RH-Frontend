import { TestBed } from '@angular/core/testing';

import { GestionioncongeService } from './gestionionconge.service';

describe('GestionioncongeService', () => {
  let service: GestionioncongeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionioncongeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
