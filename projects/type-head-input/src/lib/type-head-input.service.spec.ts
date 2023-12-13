import { TestBed } from '@angular/core/testing';

import { TypeHeadInputService } from './type-head-input.service';

describe('TypeHeadInputService', () => {
  let service: TypeHeadInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeHeadInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
