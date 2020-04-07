import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartmentPage } from './edit-department.page';

describe('EditDepartmentComponent', () => {
  let component: EditDepartmentPage;
  let fixture: ComponentFixture<EditDepartmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDepartmentPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
