import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboPreviewCardComponent} from './abo-preview-card.component';

describe('AboPreviewCardComponent', () => {
  let component: AboPreviewCardComponent;
  let fixture: ComponentFixture<AboPreviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboPreviewCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
