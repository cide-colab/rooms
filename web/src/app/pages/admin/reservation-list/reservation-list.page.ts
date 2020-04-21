import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../../services/session/session.service';
import {ReservationService} from '../../../services/reservation/reservation.service';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SimpleReservation} from '../../../models/reservation.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'page-reservation-list',
  templateUrl: './reservation-list.page.html',
  styleUrls: ['./reservation-list.page.scss']
})
export class ReservationListPage implements OnInit {

  canCreate = false;
  TRANSLATION_KEYS = TRANSLATION_KEYS;

  reservations = new Subject<SimpleReservation[]>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private readonly reservationService: ReservationService
  ) {
  }

  ngOnInit(): void {
    this.sessionService.hasPermission('create:reservation').subscribe(canCreate => this.canCreate = canCreate);
    this.reservationService.getSimpleWhereAdmin().subscribe(
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
    this.router.navigate(['/', 'reservations', 'create']);
  }

}
