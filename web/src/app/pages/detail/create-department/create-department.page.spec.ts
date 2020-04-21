import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentPage } from './create-department.page';

describe('CreateDepartmentComponent', () => {
  let component: CreateDepartmentPage;
  let fixture: ComponentFixture<CreateDepartmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDepartmentPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
