import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseDepartment} from '../../models/department.model';
import {DepartmentService} from '../../services/department/department.service';
import {mergeMap, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {SimpleConfirmDialog} from '../../dialog/simple-confirm/simple-confirm.dialog';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {SessionService} from '../../services/session/session.service';
import {SimpleRoom} from '../../models/room.model';
import {RoomService} from '../../services/room/room.service';

@Component({
  selector: 'page-department-detail',
  templateUrl: './department-detail.page.html',
  styleUrls: ['./department-detail.page.scss']
})
export class DepartmentDetailPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  department: Observable<BaseDepartment>;
  rooms: Observable<SimpleRoom[]>;
  canDelete = false;
  canUpdate = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly translateService: TranslateService,
    private readonly sessionService: SessionService,
    private readonly roomService: RoomService
  ) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.department = this.departmentService.get(id).pipe(
      tap(department => this.sessionService.hasPermission('update', department.id).subscribe(permitted => this.canUpdate = permitted)),
      tap(department => this.sessionService.hasPermission('delete', department.id).subscribe(permitted => this.canDelete = permitted))
    );

    this.rooms = this.department.pipe(mergeMap(department => this.roomService.getForDepartment(department)));
  }

  async deleteClicked(department: BaseDepartment) {
    SimpleConfirmDialog.createDialog(this.dialog, {
      title: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.delete_department.title).toPromise(),
      text: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.delete_department.text, {
        name: department.name
      }).toPromise(),
      confirmText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.confirm).toPromise(),
      chancelText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.chancel).toPromise()
    }).afterClosed().subscribe(result => {
      if (result) {
        this.delete(department);
      }
    });
  }

  private delete(department: BaseDepartment) {
    if (!this.canDelete) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    this.departmentService.delete(department).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.delete.department.success, {name: department.name});
        this.router.navigate(['/departments']);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.delete.department.failed, {name: department.name});
      }
    );
  }
}

