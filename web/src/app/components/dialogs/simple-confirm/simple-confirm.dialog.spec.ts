import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SimpleConfirmDialog} from './simple-confirm.dialog';

describe('DeleteDialogComponent', () => {
  let component: SimpleConfirmDialog;
  let fixture: ComponentFixture<SimpleConfirmDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleConfirmDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
