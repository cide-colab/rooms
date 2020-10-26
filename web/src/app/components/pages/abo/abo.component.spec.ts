import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboComponent } from './abo.component';

describe('AboComponent', () => {
  let component: AboComponent;
  let fixture: ComponentFixture<AboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
