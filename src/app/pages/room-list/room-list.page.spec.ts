import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListPage } from './room-list.page';

describe('RoomListComponent', () => {
  let component: RoomListPage;
  let fixture: ComponentFixture<RoomListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
