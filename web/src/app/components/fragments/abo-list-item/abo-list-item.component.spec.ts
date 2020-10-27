import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboListItemComponent } from './abo-list-item.component';

describe('AboListItemComponent', () => {
  let component: AboListItemComponent;
  let fixture: ComponentFixture<AboListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
