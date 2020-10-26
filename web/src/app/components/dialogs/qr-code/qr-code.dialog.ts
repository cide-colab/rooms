import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';

export interface QrCodeDialogData {
  title: string;
  subtitle: string;
  code: string;
}

@Component({
  selector: 'dialog-qr-code',
  templateUrl: './qr-code.dialog.html',
  styleUrls: ['./qr-code.dialog.scss']
})
export class QrCodeDialog implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor(
    private readonly dialogRef: MatDialogRef<QrCodeDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly data: QrCodeDialogData
  ) {
  }

  static createDialog(dialog: MatDialog, data: QrCodeDialogData): MatDialogRef<QrCodeDialog> {
    return dialog.open(QrCodeDialog, {data});
  }

  ngOnInit(): void {
  }

  onChancel() {
    this.dialogRef.close(false);
  }

}
