import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDetailPage } from './department-detail.page';

describe('DepartmentDetailComponent', () => {
  let component: DepartmentDetailPage;
  let fixture: ComponentFixture<DepartmentDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentDetailPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
