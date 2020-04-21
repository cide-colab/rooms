import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationDetailPage} from './reservation-detail.page';

describe('ReservationDetailComponent', () => {
  let component: ReservationDetailPage;
  let fixture: ComponentFixture<ReservationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationDetailPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
