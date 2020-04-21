import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationPreviewCardComponent} from './reservation-preview-card.component';

describe('ReservationPreviewCardComponent', () => {
  let component: ReservationPreviewCardComponent;
  let fixture: ComponentFixture<ReservationPreviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPreviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
