import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUpdatePageComponent } from './room-update-page.component';

describe('RoomUpdateComponent', () => {
  let component: RoomUpdatePageComponent;
  let fixture: ComponentFixture<RoomUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
