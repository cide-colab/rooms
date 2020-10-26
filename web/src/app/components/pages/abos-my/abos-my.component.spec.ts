import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosMyComponent } from './abos-my.component';

describe('AbosMyComponent', () => {
  let component: AbosMyComponent;
  let fixture: ComponentFixture<AbosMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbosMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbosMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
