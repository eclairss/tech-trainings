import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTypeahead, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CinemaListComponent } from './cinema-list.component';
import { Branch } from 'src/app/@core/models/Branch';

describe('CinemaListComponent', () => {
  let component: CinemaListComponent;
  let fixture: ComponentFixture<CinemaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaListComponent,
        NgbTypeahead,
        NgbHighlight
      ],
      imports: [
        FormsModule,
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaListComponent);
    component = fixture.componentInstance;
    component.branch = new Branch();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
