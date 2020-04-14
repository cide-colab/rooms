import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SessionService} from '../../../services/session/session.service';
import {Subject} from 'rxjs';
import {SimpleAbo} from '../../../models/abo.model';
import {AboService} from '../../../services/abo/abo.service';
import {Router} from '@angular/router';

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
    private readonly router: Router
  ) {
  }

  ngOnInit() {

    this.sessionService.hasPermission('create:abo').subscribe(canCreate => this.canCreate = canCreate);

    this.aboService.getAll()
      .subscribe(
        next => this.abos.next(next),
        error => {
          console.log(error);
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
