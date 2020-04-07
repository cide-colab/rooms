import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboListPage} from './abo-list.page';

describe('AboListComponent', () => {
  let component: AboListPage;
  let fixture: ComponentFixture<AboListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboListPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
