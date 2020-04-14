import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateReservationPage} from './create-reservation.page';

describe('CreateReservationComponent', () => {
  let component: CreateReservationPage;
  let fixture: ComponentFixture<CreateReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReservationPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
