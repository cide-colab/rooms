import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {AboService} from '../../../services/abo/abo.service';
import {Subject} from 'rxjs';
import {SimpleAbo} from '../../../models/abo.model';
import {Router} from '@angular/router';
import {SessionService} from '../../../services/session/session.service';
import {switchMap} from 'rxjs/operators';

@Component({
  templateUrl: './my-abo-list-page.component.html',
  styleUrls: ['./my-abo-list-page.component.scss']
})
export class MyAboListPageComponent implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  abos = new Subject<SimpleAbo[]>();

  constructor(
    private readonly sessionService: SessionService,
    private readonly aboService: AboService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.sessionService.getSession().pipe(
      switchMap(it => this.aboService.getSimpleByUser(it.userId))
    ).subscribe(
      next => this.abos.next(next),
      error => {
        console.log(error);
      }
    );
  }

  onItemClicked(abo: SimpleAbo) {
    this.router.navigate(['/', 'abos', abo.id]);
  }

}
