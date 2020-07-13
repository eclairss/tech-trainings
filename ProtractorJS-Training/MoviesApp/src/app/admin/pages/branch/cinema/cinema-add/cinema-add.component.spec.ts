import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CinemaAddComponent } from './cinema-add.component';

describe('CinemaAddComponent', () => {
  let component: CinemaAddComponent;
  let fixture: ComponentFixture<CinemaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CinemaAddComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
