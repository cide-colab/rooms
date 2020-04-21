import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SessionService} from '../../../services/session/session.service';
import {Subject} from 'rxjs';
import {SimpleAbo} from '../../../models/abo.model';
import {AboService} from '../../../services/abo/abo.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {mergeMap} from 'rxjs/operators';

@Component({
  templateUrl: './abo-list-page.component.html',
  styleUrls: ['./abo-list-page.component.scss']
})
export class AboListPageComponent implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  abos = new Subject<SimpleAbo[]>();

  canCreate = false;

  constructor(
    private readonly sessionService: SessionService,
    private readonly aboService: AboService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService
  ) {
  }

  ngOnInit() {

    this.sessionService.hasPermission('create:abo').subscribe(canCreate => this.canCreate = canCreate);

    this.aboService.getAll()
      .subscribe(
        next => this.abos.next(next),
        error => {
          console.log(error);
          this.translateService.get(TRANSLATION_KEYS.abo.multi)
            .pipe(mergeMap(it => this.translateService.get(TRANSLATION_KEYS.error.failed_to_fetch, {class: it})))
            .subscribe(msg => this.snackBar.open(msg));
        }
      );

  }

  onItemClicked(abo: SimpleAbo) {
    this.router.navigate(['/', 'abos', abo.id]);
  }

  onCreateClicked() {
    if (!this.canCreate) {
      return;
    }
    this.router.navigate(['/', 'abos', 'create']);
  }
}
