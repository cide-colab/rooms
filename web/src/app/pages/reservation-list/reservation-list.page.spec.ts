import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationListPage} from './reservation-list.page';

describe('ReservationListComponent', () => {
  let component: ReservationListPage;
  let fixture: ComponentFixture<ReservationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationListPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
