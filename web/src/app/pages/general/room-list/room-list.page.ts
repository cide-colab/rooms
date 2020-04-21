import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SessionService} from '../../../services/session/session.service';
import {SimpleRoom} from '../../../models/room.model';
import {RoomService} from '../../../services/room/room.service';
import {Subject} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-room-list',
  templateUrl: './room-list.page.html',
  styleUrls: ['./room-list.page.scss']
})
export class RoomListPage implements OnInit {

  rooms = new Subject<SimpleRoom[]>();

  TRANSLATION_KEYS = TRANSLATION_KEYS;
  canCreate = false;

  constructor(
    private readonly sessionService: SessionService,
    private readonly roomService: RoomService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.sessionService.hasPermission('create:room').subscribe(canCreate => this.canCreate = canCreate);
    this.roomService.getAllSimple().subscribe(
      next => this.rooms.next(next),
      error => {
        console.log(error);
        this.translateService.get(TRANSLATION_KEYS.room.multi)
          .pipe(mergeMap(it => this.translateService.get(TRANSLATION_KEYS.error.failed_to_fetch, {class: it})))
          .subscribe(msg => this.snackBar.open(msg));
      }
    );
  }

  onItemClicked(item: SimpleRoom) {
    this.router.navigate(['/', 'rooms', item.id]);
  }

  onCreateClicked() {
    if (!this.canCreate) {
      return;
    }
    this.router.navigate(['/', 'rooms', 'create']);
  }

}
