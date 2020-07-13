import { TestBed } from '@angular/core/testing';

import { LaunchPlanService } from './launch-plan.service';

describe('LaunchPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaunchPlanService = TestBed.get(LaunchPlanService);
    expect(service).toBeTruthy();
  });
});
