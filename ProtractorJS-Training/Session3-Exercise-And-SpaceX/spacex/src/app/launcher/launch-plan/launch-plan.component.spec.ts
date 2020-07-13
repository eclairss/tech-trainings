import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchPlanComponent } from './launch-plan.component';

describe('LaunchPlanComponent', () => {
  let component: LaunchPlanComponent;
  let fixture: ComponentFixture<LaunchPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
