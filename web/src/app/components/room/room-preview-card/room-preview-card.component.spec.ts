import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomPreviewCardComponent} from './room-preview-card.component';

describe('RoomPreviewCardComponent', () => {
  let component: RoomPreviewCardComponent;
  let fixture: ComponentFixture<RoomPreviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPreviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
