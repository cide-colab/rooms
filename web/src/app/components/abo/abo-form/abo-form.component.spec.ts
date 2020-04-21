import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboFormComponent} from './abo-form.component';

describe('AboFormComponent', () => {
  let component: AboFormComponent;
  let fixture: ComponentFixture<AboFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
