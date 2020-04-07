import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboDetailPage} from './abo-detail.page';

describe('AbotDetailComponent', () => {
  let component: AboDetailPage;
  let fixture: ComponentFixture<AboDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboDetailPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
