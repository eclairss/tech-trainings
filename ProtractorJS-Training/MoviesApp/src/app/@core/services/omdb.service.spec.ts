import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OMDbService } from './omdb.service';

describe('OMDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]    
  }));

  it('should be created', () => {
    const service: OMDbService = TestBed.get(OMDbService);
    expect(service).toBeTruthy();
  });
});
