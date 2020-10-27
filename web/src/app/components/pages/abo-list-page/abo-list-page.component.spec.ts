import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboListPageComponent } from './abo-list-page.component';

describe('AbosAllComponent', () => {
  let component: AboListPageComponent;
  let fixture: ComponentFixture<AboListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
