import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboUpdatePageComponent } from './abo-update-page.component';

describe('AbosUpdateComponent', () => {
  let component: AboUpdatePageComponent;
  let fixture: ComponentFixture<AboUpdatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboUpdatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
