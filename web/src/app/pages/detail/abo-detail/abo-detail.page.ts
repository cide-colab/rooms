import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../services/snackbar/snackbar.service';
import {TranslateService} from '@ngx-translate/core';
import {SessionService} from '../../../services/session/session.service';
import {AboService} from '../../../services/abo/abo.service';
import {Observable} from 'rxjs';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {DetailedAbo} from '../../../models/abo.model';
import {tap} from 'rxjs/operators';
import {SimpleConfirmDialog} from '../../../components/dialogs/simple-confirm/simple-confirm.dialog';

@Component({
  selector: 'page-abo-detail',
  templateUrl: './abo-detail.page.html',
  styleUrls: ['./abo-detail.page.scss']
})
export class AboDetailPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  abo: Observable<DetailedAbo>;
  canDelete = false;
  canUpdate = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly aboService: AboService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly translateService: TranslateService,
    private readonly sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.abo = this.aboService.get(id).pipe(
      tap(abo => this.sessionService.hasPermission('update', abo.id).subscribe(canUpdate => this.canUpdate = canUpdate)),
      tap(abo => this.sessionService.hasPermission('delete', abo.id).subscribe(canDelete => this.canDelete = canDelete)),
    );
  }

  async deleteClicked(abo: DetailedAbo) {
    SimpleConfirmDialog.createDialog(this.dialog, {
      title: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.delete_abo.title).toPromise(),
      text: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.delete_abo.text, {
        user: abo.user
      }).toPromise(),
      confirmText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.confirm).toPromise(),
      chancelText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.chancel).toPromise()
    }).afterClosed().subscribe(result => {
      if (result) {
        this.delete(abo);
      }
    });
  }

  private delete(abo: DetailedAbo) {
    this.aboService.delete(abo).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.delete.abo.success, {
          user: abo.user
        });
        this.router.navigate(['/abos']);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.delete.abo.failed, {
          user: abo.user
        });
      }
    );
  }


}
