import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../services/user/user.service';
import {ReservationService} from '../../services/reservation/reservation.service';
import {map, take, tap} from 'rxjs/operators';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';

@Component({
  selector: 'page-reservation-list',
  templateUrl: './reservation-list.page.html',
  styleUrls: ['./reservation-list.page.scss']
})
export class ReservationListPage implements OnInit {

  canCreate = false;
  title = '';
  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly reservationService: ReservationService,
    private readonly translateService: TranslateService,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.sessionService.hasPermission('create:reservation').subscribe(canCreate => this.canCreate = canCreate);
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      tap(async id => await this.generateTitle(id)),
      // tap(id => this.showUsername = !id),
    ).subscribe(id => {
      // (id ? this.aboService.getByUserId(id) : this.aboService.getAll()).pipe(
      //   tap(abos => this.filteredAbos.next(abos))
      // ).subscribe(abos => this.abos = abos);
    });
  }

  private async generateTitle(id: string) {
    if (!id) {
      this.title = await this.translateService.get(TRANSLATION_KEYS.page.reservation.list.titles.all).pipe(take(1)).toPromise();
    } else {
      const sessionUser = await this.sessionService.getSession().pipe(take(1)).toPromise();
      if (sessionUser.userId === id) {
        this.title = await this.translateService.get(TRANSLATION_KEYS.page.reservation.list.titles.owner).pipe(take(1)).toPromise();
      } else {
        const user = await this.userService.getBase(id).pipe(take(1)).toPromise();
        this.title = await this.translateService.get(TRANSLATION_KEYS.page.reservation.list.titles.user, {user: user.principal})
          .pipe(take(1)).toPromise();
      }
    }
  }

}
