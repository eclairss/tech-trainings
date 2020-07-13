import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbTypeahead, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BranchListComponent } from './branch-list.component';
import { Branch } from 'src/app/@core/models/Branch';
import { BranchCardComponent } from 'src/app/@shared/components/branch-card/branch-card.component';

describe('BranchListComponent', () => {
  let component: BranchListComponent;
  let fixture: ComponentFixture<BranchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BranchListComponent,
        BranchCardComponent,
        NgbTypeahead,
        NgbHighlight
      ],
      imports: [
        FormsModule,
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchListComponent);
    component = fixture.componentInstance;
    component.branches = [new Branch()];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
