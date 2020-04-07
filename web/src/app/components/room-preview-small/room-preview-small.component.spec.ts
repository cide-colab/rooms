import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomPreviewSmallComponent} from './room-preview-small.component';

describe('RoomPreviewSmallComponent', () => {
  let component: RoomPreviewSmallComponent;
  let fixture: ComponentFixture<RoomPreviewSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomPreviewSmallComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPreviewSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
