import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentUpdatePageComponent } from './department-update-page.component';

describe('DepartmentUpdateComponent', () => {
  let component: DepartmentUpdatePageComponent;
  let fixture: ComponentFixture<DepartmentUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
