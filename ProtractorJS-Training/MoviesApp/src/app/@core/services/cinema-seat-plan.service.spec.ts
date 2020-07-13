import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CinemaSeatPlanService } from './cinema-seat-plan.service';

describe('CinemaSeatPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]    
  }));

  it('should be created', () => {
    const service: CinemaSeatPlanService = TestBed.get(CinemaSeatPlanService);
    expect(service).toBeTruthy();
  });
});
