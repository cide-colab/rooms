import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboUpdateComponent } from './abo-update.component';

describe('AbosUpdateComponent', () => {
  let component: AboUpdateComponent;
  let fixture: ComponentFixture<AboUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
