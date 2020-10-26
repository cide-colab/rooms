import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RichAbo} from '../../../core/models/abo.model';
import {RichRoom} from '../../../core/models/room.model';
import {RichUser} from '../../../core/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AboService} from '../../../services/abo/abo.service';
import {UserService} from '../../../services/user/user.service';
import {RoomService} from '../../../services/room/room.service';
import {PermissionService} from '../../../services/permission/permission.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, switchMap, tap} from 'rxjs/operators';
import {QrCodeDialog} from '../../dialogs/qr-code/qr-code.dialog';
import {environment} from '../../../../environments/environment';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';
import {SimpleConfirmDialog} from '../../dialogs/simple-confirm/simple-confirm.dialog';

@Component({
  selector: 'component-abo',
  templateUrl: './abo.component.html',
  styleUrls: ['./abo.component.scss']
})
export class AboComponent implements OnInit, OnDestroy {

  abo: Observable<RichAbo>;
  rooms: Observable<RichRoom[]>;
  user: Observable<RichUser>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly aboService: AboService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly permissionService: PermissionService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly location: Location,
    private readonly snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.abo = this.route.params.pipe(
      map( params => params.id),
      switchMap( id => this.aboService.get(id)),
      tap( abo => this.rooms = this.roomService.getByAbo(abo.id)),
      tap( abo => this.user = this.userService.getByAbo(abo.id)),
      tap(abo => this.createDeleteButton(abo))
    );
  }

  private createDeleteButton(abo: RichAbo) {
    this.permissionService.hasPermission({
      target: AclClassAlias.abo,
      action: AclAction.DELETE,
      context: {
        objectId: abo.id,
        objectClass: AclClassAlias.abo
      }
    }).subscribe(canUpdate => {
      if (canUpdate) {
        this.toolbarService.addPageButton('delete', {
          iconClass: 'icon-delete',
          title: 'Löschen',
          click: () => this.openDeleteDialog(abo)
        });
      }
    });
  }

  private openDeleteDialog(abo: RichAbo) {
    SimpleConfirmDialog.createDialog(this.dialog, {
      title: `Abo ${abo.title} von Nutzer ${abo.user.principal} löschen`,
      text: `Soll das Abo ${abo.title} wirklich gelöscht werden?`,
      confirmText: `Ja`,
      chancelText: `Abbrechen`
    }).afterClosed().subscribe(result => {
      if (result) {
        this.delete(abo);
      }
    });
  }

  private delete(abo: RichAbo) {
    this.aboService.delete(abo.id).subscribe(
      next => {
        this.snackBar.open(`Das Abo ${abo.title} von Nutzer ${abo.user.principal} wurde erfolgreich gelöscht`, null, { duration: 3000 });
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Das Abo ${abo.title} von Nutzer ${abo.user.principal} konnte nicht gelöscht werden`, null, { duration: 3000 });
      }
    );
  }

  ngOnDestroy(): void {
  }

  roomClicked(room: RichRoom) {
    this.router.navigate(['/', 'rooms', room.id]).then();
  }

  userClicked(user: RichUser) {
    this.router.navigate(['/', 'users', user.id]).then();
  }
}
