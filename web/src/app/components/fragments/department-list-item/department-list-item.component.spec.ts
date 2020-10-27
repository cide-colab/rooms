import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentListItemComponent } from './department-list-item.component';

describe('DepartmentListItemComponent', () => {
  let component: DepartmentListItemComponent;
  let fixture: ComponentFixture<DepartmentListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
