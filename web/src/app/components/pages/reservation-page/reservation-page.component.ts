import {Component, OnDestroy, OnInit} from '@angular/core';
import {RichReservation} from '../../../core/models/reservation.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ReservationService} from '../../../services/reservation/reservation.service';
import {PermissionService} from '../../../services/permission/permission.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {map, switchMap, tap} from 'rxjs/operators';
import {QrDialog} from '../../dialogs/qr-dialog/qr-dialog.component';
import {environment} from '../../../../environments/environment';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';
import {RichAbo} from '../../../core/models/abo.model';
import {RichUser} from '../../../core/models/user.model';
import {RichRoom} from '../../../core/models/room.model';
import {AboService} from '../../../services/abo/abo.service';
import {UserService} from '../../../services/user/user.service';
import {RoomService} from '../../../services/room/room.service';
import {ConfirmDialog} from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'component-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent implements OnInit, OnDestroy {

  reservation: Observable<RichReservation>;
  abo: Observable<RichAbo>;
  user: Observable<RichUser>;
  room: Observable<RichRoom>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toolbarService: ToolbarService,
    private readonly reservationService: ReservationService,
    private readonly aboService: AboService,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly permissionService: PermissionService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location
  ) {
  }

  ngOnInit(): void {
    this.reservation = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.reservationService.get(id)),
      tap(reservation => this.toolbarService.setPageTitle(`Buchung ${reservation.title}`)),
      tap(reservation => this.loadResources(reservation)),
      tap(reservation => this.createQrButton(reservation)),
      tap(reservation => this.createUpdateButton(reservation)),
      tap(reservation => this.createDeleteButton(reservation))
    );
  }

  loadResources(reservation: RichReservation) {
    this.permissionService.hasPermission({
      target: AclClassAlias.user,
      action: AclAction.READ,
      context: {objectId: reservation.user.id, objectClass: AclClassAlias.user}
    }).subscribe( hasPermission => {
      if (hasPermission) {
        this.user = this.userService.get(reservation.user.id);
      }
    });
    this.permissionService.hasPermission({
      target: AclClassAlias.room,
      action: AclAction.READ,
      context: {objectId: reservation.room.id, objectClass: AclClassAlias.room}
    }).subscribe( hasPermission => {
      if (hasPermission) {
        this.room = this.roomService.get(reservation.room.id);
      }
    });
    this.permissionService.hasPermission({
      target: AclClassAlias.abo,
      action: AclAction.READ,
      context: {objectId: reservation.abo.id, objectClass: AclClassAlias.abo}
    }).subscribe( hasPermission => {
      if (hasPermission) {
        this.abo = this.aboService.get(reservation.abo.id);
      }
    });
  }

  roomClicked(room: RichRoom) {
    this.router.navigate(['/', 'rooms', room.id]).then();
  }

  userClicked(user: RichUser) {
    this.router.navigate(['/', 'users', user.id]).then();
  }

  aboClicked(abo: RichAbo) {
    this.router.navigate(['/', 'abos', abo.id]).then();
  }

  private createQrButton(reservation: RichReservation) {
    this.toolbarService.addPageButton('code', {
      iconClass: 'icon-qrcode',
      title: 'Code',
      click: () => {
        QrDialog.createDialog(this.dialog, {
          title: reservation.title,
          subtitle: ``,
          code: `${environment.frontend_url}/reservations/${reservation.id}`
        });
      }
    });
  }

  private createUpdateButton(reservation: RichReservation) {
    this.permissionService.hasPermission({
      target: AclClassAlias.reservation,
      action: AclAction.UPDATE,
      context: {
        objectId: reservation.id,
        objectClass: AclClassAlias.reservation
      }
    }).subscribe(canUpdate => {
      if (canUpdate) {
        this.toolbarService.addPageButton('update', {
          iconClass: 'icon-createmode_editedit',
          title: 'Bearbeiten',
          click: () => this.router.navigate(['/', 'reservations', reservation.id, 'update'])
        });
      }
    });
  }

  private createDeleteButton(reservation: RichReservation) {
    this.permissionService.hasPermission({
      target: AclClassAlias.reservation,
      action: AclAction.DELETE,
      context: {
        objectId: reservation.id,
        objectClass: AclClassAlias.reservation
      }
    }).subscribe(canUpdate => {
      if (canUpdate) {
        this.toolbarService.addPageButton('delete', {
          iconClass: 'icon-delete',
          title: 'Löschen',
          click: () => this.openDeleteDialog(reservation)
        });
      }
    });
  }

  private openDeleteDialog(reservation: RichReservation) {
    ConfirmDialog.createDialog(this.dialog, {
      title: `Buchung ${reservation.title} löschen`,
      text: `Soll die Buchung ${reservation.title} wirklich gelöscht werden?`,
      confirmText: `Ja`,
      chancelText: `Abbrechen`
    }).afterClosed().subscribe(result => {
      if (result) {
        this.delete(reservation);
      }
    });
  }

  private delete(reservation: RichReservation) {
    this.reservationService.delete(reservation.id).subscribe(
      next => {
        this.snackBar.open(`Buchung ${reservation.title} erfolgreich gelöscht`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Buchung ${reservation.title} konnte nicht gelöscht werden`, null, {duration: 3000});
      }
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }
}
