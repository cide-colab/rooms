import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateAboPage} from './create-abo.page';

describe('CreateAboComponent', () => {
  let component: CreateAboPage;
  let fixture: ComponentFixture<CreateAboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAboPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
