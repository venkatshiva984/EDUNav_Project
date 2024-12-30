import { TestBed } from '@angular/core/testing';

import { EduNavigatorService } from './edu-navigator.service';

describe('EduNavigatorService', () => {
  let service: EduNavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduNavigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
