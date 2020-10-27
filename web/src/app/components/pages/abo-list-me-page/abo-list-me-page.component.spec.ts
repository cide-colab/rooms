import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboListMePageComponent } from './abo-list-me-page.component';

describe('AbosMyComponent', () => {
  let component: AboListMePageComponent;
  let fixture: ComponentFixture<AboListMePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboListMePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboListMePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
