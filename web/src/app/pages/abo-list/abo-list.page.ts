import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {SessionService} from '../../services/session/session.service';
import {Subject} from 'rxjs';
import {SimpleAbo} from '../../models/abo.model';
import {AboService} from '../../services/abo/abo.service';
import {map, take, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'page-abo-list',
  templateUrl: './abo-list.page.html',
  styleUrls: ['./abo-list.page.scss']
})
export class AboListPage implements OnInit {

  abos: SimpleAbo[];
  TRANSLATION_KEYS = TRANSLATION_KEYS;
  canCreate = false;
  filteredAbos = new Subject<SimpleAbo[]>();
  title = '';
  showUsername = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly aboService: AboService,
    private readonly translateService: TranslateService,
    private readonly userService: UserService
  ) {
  }

  private static getAboFilterString(abo: SimpleAbo): string {
    return `${abo.rooms.map(room => `${room.name} ${room.number}`).join(' ')} ${abo.user.principal} ${abo.user.givenName}`;
  }

  async ngOnInit() {

    this.sessionService.hasPermission('create:abo').subscribe(canCreate => this.canCreate = canCreate);

    this.route.paramMap.pipe(
      map(params => params.get('id')),
      tap(async id => await this.generateTitle(id)),
      tap(id => this.showUsername = !id),
    ).subscribe(id => {
      (id ? this.aboService.getSimpleByUser(id) : this.aboService.getAll()).pipe(
        tap(abos => this.filteredAbos.next(abos))
      ).subscribe(abos => this.abos = abos);
    });

  }

  onSearch(query: string) {
    this.filteredAbos.next(
      this.abos
        ? this.abos.filter(abo => AboListPage.getAboFilterString(abo).toLowerCase().includes(query.toLowerCase()))
        : []
    );
  }

  private async generateTitle(id: string) {
    if (!id) {
      this.title = await this.translateService.get(TRANSLATION_KEYS.page.abo.list.titles.all).pipe(take(1)).toPromise();
    } else {
      const sessionUser = await this.sessionService.getSession().pipe(take(1)).toPromise();
      if (sessionUser.userId === id) {
        this.title = await this.translateService.get(TRANSLATION_KEYS.page.abo.list.titles.owner).pipe(take(1)).toPromise();
      } else {
        const user = await this.userService.getBase(id).pipe(take(1)).toPromise();
        this.title = await this.translateService.get(TRANSLATION_KEYS.page.abo.list.titles.user, {user: user.principal})
          .pipe(take(1)).toPromise();
      }
    }
  }
}
