import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAboListPageComponent } from './my-abo-list-page.component';

describe('MyAbosComponent', () => {
  let component: MyAboListPageComponent;
  let fixture: ComponentFixture<MyAboListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAboListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAboListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
