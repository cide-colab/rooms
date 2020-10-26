import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosAllComponent } from './abos-all.component';

describe('AbosAllComponent', () => {
  let component: AbosAllComponent;
  let fixture: ComponentFixture<AbosAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbosAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbosAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
