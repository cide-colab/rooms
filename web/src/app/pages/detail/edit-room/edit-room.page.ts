import {Component, OnInit, ViewChild} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../services/snackbar/snackbar.service';
import {SessionService} from '../../../services/session/session.service';
import {TranslateService} from '@ngx-translate/core';
import {SimpleConfirmDialog} from '../../../dialog/simple-confirm/simple-confirm.dialog';
import {SimpleRoom} from '../../../models/room.model';
import {RoomFormComponent} from '../../../components/room/room-form/room-form.component';
import {RoomService} from '../../../services/room/room.service';
import {from} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'page-edit-room',
  templateUrl: './edit-room.page.html',
  styleUrls: ['./edit-room.page.scss']
})
export class EditRoomPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;
  room: Promise<SimpleRoom>;

  @ViewChild(RoomFormComponent)
  private readonly roomForm: RoomFormComponent;

  canEdit = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomService: RoomService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly sessionService: SessionService,
    private readonly translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    this.room = from(this.roomService.getWithDepartment(id)).pipe(
      tap(room => this.sessionService.hasPermission('update', room.id).subscribe(canEdit => this.canEdit = canEdit))
    ).toPromise();
  }

  onSubmit(room: SimpleRoom) {
    if (!this.canEdit) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    this.roomService.update(room).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.edit.room.success, {
          name: room.name,
          number: room.number
        });
        this.router.navigate(['/', 'rooms', room.id]);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.edit.room.failed, {
          name: room.name,
          number: room.number
        });
      }
    );
  }

  async resetClicked() {
    if (this.roomForm) {
      SimpleConfirmDialog.createDialog(this.dialog, {
        title: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.reset_edit_data.title).toPromise(),
        text: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.reset_edit_data.text).toPromise(),
        confirmText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.confirm).toPromise(),
        chancelText: await this.translateService.get(TRANSLATION_KEYS.dialog.simple_confirm.default.chancel).toPromise()
      }).afterClosed().subscribe(result => {
        if (result) {
          this.roomForm.reset();
        }
      });
    }
  }
}
