import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  text: string;
  confirmText: string;
  chancelText: string;
  icon_class?: string;
}

@Component({
  selector: 'dialog-simple-confirmation',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialog implements OnInit {

  static createDialog(dialog: MatDialog, data: ConfirmDialogData): MatDialogRef<ConfirmDialog> {
    return dialog.open(ConfirmDialog, {data});
  }

  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmDialogData
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
