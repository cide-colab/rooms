import {Component, OnInit, ViewChild} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {DetailedAbo} from '../../../models/abo.model';
import {AboFormComponent} from '../../../components/abo-form/abo-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../services/snackbar/snackbar.service';
import {SessionService} from '../../../services/session/session.service';
import {TranslateService} from '@ngx-translate/core';
import {AboService} from '../../../services/abo/abo.service';
import {from} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SimpleConfirmDialog} from '../../../dialog/simple-confirm/simple-confirm.dialog';

@Component({
  selector: 'page-edit-abo',
  templateUrl: './edit-abo.page.html',
  styleUrls: ['./edit-abo.page.scss']
})
export class EditAboPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;
  abo: Promise<DetailedAbo>;
  canEdit = false;
  @ViewChild(AboFormComponent)
  private readonly aboForm: AboFormComponent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly aboService: AboService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly sessionService: SessionService,
    private readonly translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.abo = from(this.aboService.get(id)).pipe(
      tap(abo => this.sessionService.hasPermission('update', abo.id).subscribe(canEdit => this.canEdit = canEdit))
    ).toPromise();
  }

  onSubmit(abo: DetailedAbo) {
    if (!this.canEdit) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    this.aboService.update(abo).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.edit.abo.success, {
          user: abo.user.principal
        });
        this.router.navigate(['/', 'abos', abo.id]);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.edit.abo.failed, {
          user: abo.user.principal
        });
      }
    );
  }

  async resetClicked() {
    if (this.aboForm) {
      SimpleConfirmDialog.createDialog(this.dialog, {
        title: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.reset_edit_data.title).toPromise(),
        text: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.reset_edit_data.text).toPromise(),
        confirmText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.confirm).toPromise(),
        chancelText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.chancel).toPromise()
      }).afterClosed().subscribe(result => {
        if (result) {
          this.aboForm.reset();
        }
      });
    }
  }

}
