import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {Router} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {SimpleAbo} from '../../models/abo.model';
import {take} from 'rxjs/operators';
import {AboService} from '../../services/abo/abo.service';

@Component({
  selector: 'page-create-abo',
  templateUrl: './create-abo.page.html',
  styleUrls: ['./create-abo.page.scss']
})
export class CreateAboPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private readonly aboService: AboService
  ) {
  }

  ngOnInit(): void {
  }

  async onSubmit(abo: SimpleAbo) {
    if (!await this.sessionService.hasPermissionForAll('create:abo', abo.rooms.map(room => room.id)).pipe(take(1)).toPromise()) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    this.aboService.save(abo).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.abo.success, {
          user: abo.user.givenName
        });
        this.router.navigate(['/abos']);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.abo.failed, {
          user: abo.user.givenName
        });
      }
    );
  }
}
