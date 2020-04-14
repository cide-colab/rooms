import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SimpleRoom} from '../../../models/room.model';
import {SnackbarService} from '../../../services/snackbar/snackbar.service';
import {Router} from '@angular/router';
import {SessionService} from '../../../services/session/session.service';
import {RoomService} from '../../../services/room/room.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'page-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss']
})
export class CreateRoomPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;


  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private readonly roomService: RoomService
  ) {
  }


  ngOnInit(): void {
  }

  async onSubmit(room: SimpleRoom) {
    if (!await this.sessionService.hasPermission('create:room', room.department.id).pipe(take(1)).toPromise()) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    this.roomService.save(room).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.room.success, {
          name: room.name,
          number: room.number
        });
        this.router.navigate(['/rooms']);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.room.failed, {
          name: room.name,
          number: room.number
        });
      }
    );
  }
}
