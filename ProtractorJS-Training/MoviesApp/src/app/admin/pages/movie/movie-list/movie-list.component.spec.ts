import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTypeahead, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MovieListComponent } from './movie-list.component';
import { MovieCardComponent } from 'src/app/@shared/components/movie-card/movie-card.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieListComponent,
        MovieCardComponent,
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
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
