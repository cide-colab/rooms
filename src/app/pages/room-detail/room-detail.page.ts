import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {TranslateService} from '@ngx-translate/core';
import {SimpleConfirmDialog} from '../../dialog/simple-confirm/simple-confirm.dialog';
import {SimpleRoom} from '../../models/room.model';
import {RoomService} from '../../services/room/room.service';
import {SessionService} from '../../services/session/session.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {QrCodeDialog} from '../../dialog/qr-code/qr-code.dialog';

@Component({
  selector: 'page-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss']
})
export class RoomDetailPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  room: Observable<SimpleRoom>;
  canDelete = false;
  canUpdate = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomService: RoomService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly translateService: TranslateService,
    private readonly sessionService: SessionService
  ) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.room = this.roomService.getWithDepartment(id).pipe(
      tap(room => this.sessionService.hasPermission('update', room.id).subscribe(canUpdate => this.canUpdate = canUpdate)),
      tap(room => this.sessionService.hasPermission('delete', room.id).subscribe(canDelete => this.canDelete = canDelete)),
    );
  }

  async deleteClicked(room: SimpleRoom) {
    SimpleConfirmDialog.createDialog(this.dialog, {
      title: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.delete_room.title).toPromise(),
      text: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.delete_room.text, {
        name: room.name,
        number: room.number
      }).toPromise(),
      confirmText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.confirm).toPromise(),
      chancelText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.chancel).toPromise()
    }).afterClosed().subscribe(result => {
      if (result) {
        this.delete(room);
      }
    });
  }

  openQRDialog(room: SimpleRoom) {
    QrCodeDialog.createDialog(this.dialog, {
      title: room.name,
      subtitle: `Raum ${room.number}`,
      code: this.getResourceUrl(room)
    });
  }

  private delete(room: SimpleRoom) {
    this.roomService.delete(room).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.delete.room.success, {
          name: room.name,
          number: room.number
        });
        this.router.navigate(['/rooms']);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.delete.room.failed, {
          name: room.name,
          number: room.number
        });
      }
    );
  }

  private getResourceUrl(room: SimpleRoom) {
    return `${environment.frontend_url}/rooms/${room.id}`;
  }
}
