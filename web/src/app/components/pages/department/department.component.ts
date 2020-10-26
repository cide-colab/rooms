import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Department, RichDepartment} from '../../../core/models/department.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../../services/room/room.service';
import {PermissionService} from '../../../services/permission/permission.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {DepartmentService} from '../../../services/department/department.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {QrCodeDialog} from '../../dialogs/qr-code/qr-code.dialog';
import {environment} from '../../../../environments/environment';
import {RichRoom} from '../../../core/models/room.model';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';
import {SimpleConfirmDialog} from '../../dialogs/simple-confirm/simple-confirm.dialog';

@Component({
  selector: 'component-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  department: Observable<RichDepartment>;
  rooms: Observable<RichRoom[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private readonly roomService: RoomService,
    private readonly permissionService: PermissionService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location
  ) { }

  ngOnInit(): void {
    this.department = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.departmentService.get(id)),
      tap( department => this.rooms = this.roomService.getByDepartmentId(department.id)),
      tap( department => this.toolbarService.setPageTitle(`Abteilung ${department.name}`)),
      tap(department => this.createQrButton(department)),
      tap(department => this.createUpdateButton(department)),
      tap(department => this.createDeleteButton(department))
    );
  }

  private createQrButton(department: RichDepartment) {
    this.toolbarService.addPageButton('code', {
      iconClass: 'icon-qrcode',
      title: 'Code',
      click: () => {
        QrCodeDialog.createDialog(this.dialog, {
          title: department.name,
          subtitle: ``,
          code: `${environment.frontend_url}/departments/${department.id}`
        });
      }
    });
  }

  private createUpdateButton(department: RichDepartment) {
    this.permissionService.hasPermission({
      target: AclClassAlias.department,
      action: AclAction.UPDATE,
      context: {
        objectId: department.id,
        objectClass: AclClassAlias.department
      }
    }).subscribe(canUpdate => {
      if (canUpdate) {
        this.toolbarService.addPageButton('update', {
          iconClass: 'icon-createmode_editedit',
          title: 'Bearbeiten',
          click: () => this.router.navigate(['/', 'departments', department.id, 'update'])
        });
      }
    });
  }

  private createDeleteButton(department: RichDepartment) {
    this.permissionService.hasPermission({
      target: AclClassAlias.department,
      action: AclAction.DELETE,
      context: {
        objectId: department.id,
        objectClass: AclClassAlias.department
      }
    }).subscribe(canUpdate => {
      if (canUpdate) {
        this.toolbarService.addPageButton('delete', {
          iconClass: 'icon-delete',
          title: 'Löschen',
          click: () => this.openDeleteDialog(department)
        });
      }
    });
  }

  roomClicked(room: RichRoom) {
    this.router.navigate(['/', 'rooms', room.id]).then();
  }

  private openDeleteDialog(department: RichDepartment) {
    SimpleConfirmDialog.createDialog(this.dialog, {
      title: `Abteilung ${department.name} löschen`,
      text: `Soll Abteilung ${department.name} wirklich gelöscht werden?`,
      confirmText: `Ja`,
      chancelText: `Abbrechen`
    }).afterClosed().subscribe(result => {
      if (result) {
        this.delete(department);
      }
    });
  }

  private delete(department: RichDepartment) {
    this.departmentService.delete(department.id).subscribe(
      next => {
        this.snackBar.open(`Abteilung ${department.name} erfolgreich gelöscht`, null, { duration: 3000 });
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Abteilung ${department.name} konnte nicht gelöscht werden`, null, { duration: 3000 });
      }
    );
  }
}
