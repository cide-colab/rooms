import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditAboPage} from './edit-abo.page';

describe('EditAboComponent', () => {
  let component: EditAboPage;
  let fixture: ComponentFixture<EditAboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAboPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
