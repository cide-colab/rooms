import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEditorComponent } from './department-editor.component';

describe('DepartmentEditorComponent', () => {
  let component: DepartmentEditorComponent;
  let fixture: ComponentFixture<DepartmentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
