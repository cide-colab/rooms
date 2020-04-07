import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface SimpleConfirmDialogData {
  title: string;
  text: string;
  confirmText: string;
  chancelText: string;
  icon_class?: string;
}

@Component({
  selector: 'dialog-simple-confirmation',
  templateUrl: './simple-confirm.dialog.html',
  styleUrls: ['./simple-confirm.dialog.scss']
})
export class SimpleConfirmDialog implements OnInit {

  static createDialog(dialog: MatDialog, data: SimpleConfirmDialogData): MatDialogRef<SimpleConfirmDialog> {
    return dialog.open(SimpleConfirmDialog, {data});
  }

  constructor(
    private readonly dialogRef: MatDialogRef<SimpleConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly data: SimpleConfirmDialogData
  ) {
  }

  ngOnInit() {
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onChancel() {
    this.dialogRef.close(false);
  }

}
