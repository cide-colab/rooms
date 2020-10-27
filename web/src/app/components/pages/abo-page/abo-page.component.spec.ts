import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboPageComponent } from './abo-page.component';

describe('AboComponent', () => {
  let component: AboPageComponent;
  let fixture: ComponentFixture<AboPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
