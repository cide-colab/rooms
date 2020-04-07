import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomPage } from './create-room.page';

describe('CreateRoomComponent', () => {
  let component: CreateRoomPage;
  let fixture: ComponentFixture<CreateRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoomPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
