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
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss']
})
export class QrDialog implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor(
    private readonly dialogRef: MatDialogRef<QrDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly data: QrCodeDialogData
  ) {
  }

  static createDialog(dialog: MatDialog, data: QrCodeDialogData): MatDialogRef<QrDialog> {
    return dialog.open(QrDialog, {data});
  }

  ngOnInit(): void {
  }

  onChancel() {
    this.dialogRef.close(false);
  }

}
