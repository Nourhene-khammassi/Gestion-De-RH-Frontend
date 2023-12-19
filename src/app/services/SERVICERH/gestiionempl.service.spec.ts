import { TestBed } from '@angular/core/testing';

import { GestiionemplService } from './gestiionempl.service';

describe('GestiionemplService', () => {
  let service: GestiionemplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestiionemplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
