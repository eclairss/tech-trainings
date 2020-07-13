import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCardComponent } from './branch-card.component';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { Branch } from 'src/app/@core/models/Branch';

describe('BranchCardComponent', () => {
  let component: BranchCardComponent;
  let fixture: ComponentFixture<BranchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchCardComponent, RouterLinkDirectiveStub ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchCardComponent);
    component = fixture.componentInstance;
    component.branch = new Branch();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
