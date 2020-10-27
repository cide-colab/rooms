import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationListItemComponent } from './reservation-list-item.component';

describe('ReservationListItemComponent', () => {
  let component: ReservationListItemComponent;
  let fixture: ComponentFixture<ReservationListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
