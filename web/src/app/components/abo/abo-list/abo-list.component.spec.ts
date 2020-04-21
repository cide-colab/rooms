import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboListComponent} from './abo-list.component';

describe('AboListComponent', () => {
  let component: AboListComponent;
  let fixture: ComponentFixture<AboListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
