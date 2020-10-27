import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreatePageComponent } from './room-create-page.component';

describe('RoomCreateComponent', () => {
  let component: RoomCreatePageComponent;
  let fixture: ComponentFixture<RoomCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
