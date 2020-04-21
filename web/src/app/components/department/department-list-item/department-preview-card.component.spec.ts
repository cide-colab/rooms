import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DepartmentPreviewCardComponent} from './department-preview-card.component';

describe('DepartmentListItemComponent', () => {
  let component: DepartmentPreviewCardComponent;
  let fixture: ComponentFixture<DepartmentPreviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentPreviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
