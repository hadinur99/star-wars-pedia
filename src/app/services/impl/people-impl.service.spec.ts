import { TestBed } from '@angular/core/testing';

import { PeopleImplService } from './people-impl.service';

describe('PeopleImplService', () => {
  let service: PeopleImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
