import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationUpdatePageComponent } from './reservation-update-page.component';

describe('ReservationUpdatePageComponent', () => {
  let component: ReservationUpdatePageComponent;
  let fixture: ComponentFixture<ReservationUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
