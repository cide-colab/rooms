import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCreatePageComponent } from './reservation-create-page.component';

describe('ReservationCreatePageComponent', () => {
  let component: ReservationCreatePageComponent;
  let fixture: ComponentFixture<ReservationCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
