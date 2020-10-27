import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosPageComponent } from './abos-page.component';

describe('AbosAllComponent', () => {
  let component: AbosPageComponent;
  let fixture: ComponentFixture<AbosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
