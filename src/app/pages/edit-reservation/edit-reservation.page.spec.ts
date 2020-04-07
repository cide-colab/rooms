import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditReservationPage} from './edit-reservation.page';

describe('EditReservationComponent', () => {
  let component: EditReservationPage;
  let fixture: ComponentFixture<EditReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditReservationPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
