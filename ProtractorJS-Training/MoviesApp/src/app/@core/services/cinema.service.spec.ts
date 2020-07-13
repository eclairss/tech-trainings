import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CinemaService } from './cinema.service';

describe('CinemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]    
  }));

  it('should be created', () => {
    const service: CinemaService = TestBed.get(CinemaService);
    expect(service).toBeTruthy();
  });
});
