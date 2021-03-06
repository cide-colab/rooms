import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RichRoom} from '../../../core/models/room.model';
import {RoomService} from '../../../services/room/room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {PermissionService} from '../../../services/permission/permission.service';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {MatDialog} from '@angular/material/dialog';
import {QrDialog} from '../../dialogs/qr-dialog/qr-dialog.component';
import {environment} from '../../../../environments/environment';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialog} from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'component-room',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {

  room: Observable<RichRoom>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomService: RoomService,
    private readonly permissionService: PermissionService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location
  ) {
  }

  ngOnInit(): void {
    this.room = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.roomService.get(id)),
      tap( room => this.toolbarService.setPageTitle(`Raum ${room.number}`)),
      tap(room => this.createQrButton(room)),
      tap(room => this.createUpdateButton(room)),
      tap(room => this.createDeleteButton(room))
    );
  }

  private createUpdateButton(room: RichRoom) {
    this.permissionService.hasPermission({
      target: AclClassAlias.room,
      action: AclAction.UPDATE,
      context: {
        objectId: room.id,
        objectClass: AclClassAlias.room
      }
    }).subscribe(canUpdate => {
      if (canUpdate) {
        this.toolbarService.addPageButton('update', {
          iconClass: 'icon-createmode_editedit',
          title: 'Bearbeiten',
          click: () => this.router.navigate(['/', 'rooms', room.id, 'update'])
        });
      }
    });
  }

  private createDeleteButton(room: RichRoom) {
    this.permissionService.hasPermission({
      target: AclClassAlias.room,
      action: AclAction.DELETE,
      context: {
        objectId: room.id,
        objectClass: AclClassAlias.room
      }
    }).subscribe(canUpdate => {
      if (canUpdate) {
        this.toolbarService.addPageButton('delete', {
          iconClass: 'icon-delete',
          title: 'Löschen',
          click: () => this.openDeleteDialog(room)
        });
      }
    });
  }

  private openDeleteDialog(room: RichRoom) {
    ConfirmDialog.createDialog(this.dialog, {
      title: `Raum ${room.number} löschen`,
      text: `Soll Raum ${room.number} wirklich gelöscht werden?`,
      confirmText: `Ja`,
      chancelText: `Abbrechen`
    }).afterClosed().subscribe(result => {
      if (result) {
        this.delete(room);
      }
    });
  }

  private delete(room: RichRoom) {
    this.roomService.delete(room.id).subscribe(
      next => {
        this.snackBar.open(`Raum ${room.number} erfolgreich gelöscht`, null, { duration: 3000 });
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Raum ${room.number} konnte nicht gelöscht werden`, null, { duration: 3000 });
      }
    );
  }

  private createQrButton(room: RichRoom) {
    this.toolbarService.addPageButton('code', {
      iconClass: 'icon-qrcode',
      title: 'Code',
      click: () => {
        QrDialog.createDialog(this.dialog, {
          title: room.name,
          subtitle: `Raum ${room.number}`,
          code: `${environment.frontend_url}/rooms/${room.id}`
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }
}
