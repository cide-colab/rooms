import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentListPageComponent } from './department-list-page.component';

describe('DepartmentsComponent', () => {
  let component: DepartmentListPageComponent;
  let fixture: ComponentFixture<DepartmentListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
