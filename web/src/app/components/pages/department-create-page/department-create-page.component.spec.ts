import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCreatePageComponent } from './department-create-page.component';

describe('DepartmentCreateComponent', () => {
  let component: DepartmentCreatePageComponent;
  let fixture: ComponentFixture<DepartmentCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
