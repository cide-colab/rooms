import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosMePageComponent } from './abos-me-page.component';

describe('AbosMyComponent', () => {
  let component: AbosMePageComponent;
  let fixture: ComponentFixture<AbosMePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbosMePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbosMePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
