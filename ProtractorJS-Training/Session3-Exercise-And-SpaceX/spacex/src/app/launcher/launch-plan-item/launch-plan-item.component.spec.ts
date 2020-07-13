import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchPlanItemComponent } from './launch-plan-item.component';

describe('LaunchPlanItemComponent', () => {
  let component: LaunchPlanItemComponent;
  let fixture: ComponentFixture<LaunchPlanItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchPlanItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchPlanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
