import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QrDialog} from './qr-dialog.component';

describe('QrCodeComponent', () => {
  let component: QrDialog;
  let fixture: ComponentFixture<QrDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
