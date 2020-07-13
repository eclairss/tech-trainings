import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLauncherComponent } from './form-launcher.component';

describe('FormLauncherComponent', () => {
  let component: FormLauncherComponent;
  let fixture: ComponentFixture<FormLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
