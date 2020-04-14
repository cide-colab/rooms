import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../services/department/department.service';
import {BaseDepartment} from '../../../models/department.model';
import {DepartmentFormComponent} from '../../../components/department-form/department-form.component';
import {MatDialog} from '@angular/material/dialog';
import {SimpleConfirmDialog} from '../../../dialog/simple-confirm/simple-confirm.dialog';
import {SessionService} from '../../../services/session/session.service';
import {TranslateService} from '@ngx-translate/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SnackbarService} from '../../../services/snackbar/snackbar.service';
import {from} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'page-edit-department',
  templateUrl: './edit-department.page.html',
  styleUrls: ['./edit-department.page.scss']
})
export class EditDepartmentPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;
  department: Promise<BaseDepartment>;

  @ViewChild(DepartmentFormComponent)
  private readonly departmentForm: DepartmentFormComponent;

  canEdit = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly sessionService: SessionService,
    private readonly translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.department = from(this.departmentService.get(id)).pipe(
      tap(department => this.sessionService.hasPermission('update', department.id).subscribe(canEdit => this.canEdit = canEdit))
    ).toPromise();
  }

  onSubmit(department: BaseDepartment) {
    if (!this.canEdit) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    this.departmentService.update(department).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.edit.department.success, {name: department.name});
        this.router.navigate(['/', 'departments', department.id]);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.edit.department.failed, {name: department.name});
      }
    );
  }

  async resetClicked() {
    if (this.departmentForm) {
      SimpleConfirmDialog.createDialog(this.dialog, {
        title: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.reset_edit_data.title).toPromise(),
        text: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.reset_edit_data.text).toPromise(),
        confirmText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.confirm).toPromise(),
        chancelText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.chancel).toPromise()
      }).afterClosed().subscribe(result => {
        if (result) {
          this.departmentForm.reset();
        }
      });
    }
  }
}
