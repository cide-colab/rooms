import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailPage } from './room-detail.page';

describe('RoomDetailComponent', () => {
  let component: RoomDetailPage;
  let fixture: ComponentFixture<RoomDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
