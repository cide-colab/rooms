import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboCreatePageComponent } from './abo-create-page.component';

describe('AboCreateComponent', () => {
  let component: AboCreatePageComponent;
  let fixture: ComponentFixture<AboCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
