import { TestBed } from '@angular/core/testing';

import { NotserviService } from './notservi.service';

describe('NotserviService', () => {
  let service: NotserviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotserviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
