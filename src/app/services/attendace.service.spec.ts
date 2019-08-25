import { TestBed } from '@angular/core/testing';

import { AttendaceService } from './attendace.service';

describe('AttendaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendaceService = TestBed.get(AttendaceService);
    expect(service).toBeTruthy();
  });
});
