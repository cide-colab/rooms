import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QrCodeDialog} from './qr-code.dialog';

describe('QrCodeComponent', () => {
  let component: QrCodeDialog;
  let fixture: ComponentFixture<QrCodeDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrCodeDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
