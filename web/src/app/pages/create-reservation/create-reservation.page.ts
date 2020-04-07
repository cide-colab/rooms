import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {SimpleReservation} from '../../models/reservation.model';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {ReservationService} from '../../services/reservation/reservation.service';

@Component({
  selector: 'page-create-reservation',
  templateUrl: './create-reservation.page.html',
  styleUrls: ['./create-reservation.page.scss']
})
export class CreateReservationPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  initialUserId: string;
  initialRoomId: string;
  initialStart: Date;

  preparationFinished = false;

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly reservationService: ReservationService
  ) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(async map => {

      const unauthorized = () => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
        const uri = map.get('redirectUri');
        this.router.navigate([uri ? uri : '']);
      };

      const userId = map.get('user');
      if (userId) {
        if (await this.sessionService.hasPermissionPromise('create:reservation', userId)) {
          this.initialUserId = userId;
        } else {
          unauthorized();
        }
      }

      const roomId = map.get('room');
      if (roomId) {
        if (await this.sessionService.hasPermissionPromise('create:reservation', roomId)) {
          this.initialRoomId = roomId;
        } else {
          unauthorized();
        }
      }
      // TODO prepare start

      this.preparationFinished = true;
    });
  }

  async onSubmit(reservation: SimpleReservation) {
    if (
      !await this.sessionService.hasPermissionPromise('create:reservation', reservation.room.id) ||
      !await this.sessionService.hasPermissionPromise('create:reservation', reservation.user.id)
    ) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    // this.aboService.save(abo).subscribe(
    //   next => {
    //     this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.abo.success, {
    //       user: abo.user.givenName
    //     });
    //     this.router.navigate(['/abos']);
    //   },
    //   error => {
    //     console.log(error);
    //     this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.abo.failed, {
    //       user: abo.user.givenName
    //     });
    //   }
    // );
  }

}
