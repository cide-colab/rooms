import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {Subject} from 'rxjs';
import {SimpleReservation} from '../../../models/reservation.model';
import {SessionService} from '../../../services/session/session.service';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ReservationService} from '../../../services/reservation/reservation.service';

@Component({
  templateUrl: './my-reservation-list-page.component.html',
  styleUrls: ['./my-reservation-list-page.component.scss']
})
export class MyReservationListPageComponent implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  reservations = new Subject<SimpleReservation[]>();
  canCreate = false;

  constructor(
    private readonly sessionService: SessionService,
    private readonly reservationService: ReservationService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.sessionService.hasPermission('create:reservation').subscribe(canCreate => this.canCreate = canCreate);

    this.sessionService.getSession().pipe(
      switchMap(it => this.reservationService.getSimpleByUser(it.userId))
    ).subscribe(
      next => this.reservations.next(next),
      error => {
        console.log(error);
      }
    );
  }

  onItemClicked(reservation: SimpleReservation) {
    this.router.navigate(['/', 'reservations', reservation.id]);
  }

  onCreateClicked() {
    this.sessionService.getSession().subscribe(session => {
      this.router.navigate(['/', 'reservations', 'create'], {
        queryParams: {user: session.userId}
      });
    });
  }

}
