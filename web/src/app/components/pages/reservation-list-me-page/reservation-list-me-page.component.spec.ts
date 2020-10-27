import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationListMePageComponent } from './reservation-list-me-page.component';

describe('ReservationListMePageComponent', () => {
  let component: ReservationListMePageComponent;
  let fixture: ComponentFixture<ReservationListMePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationListMePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListMePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
