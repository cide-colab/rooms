import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomPage } from './edit-room.page';

describe('EditRoomComponent', () => {
  let component: EditRoomPage;
  let fixture: ComponentFixture<EditRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
