import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboCreateComponent } from './abo-create.component';

describe('AboCreateComponent', () => {
  let component: AboCreateComponent;
  let fixture: ComponentFixture<AboCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
