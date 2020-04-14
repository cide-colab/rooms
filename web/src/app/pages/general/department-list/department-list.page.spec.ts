import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DepartmentListPage} from './department-list.page';

describe('DepartmentListComponent', () => {
  let component: DepartmentListPage;
  let fixture: ComponentFixture<DepartmentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
