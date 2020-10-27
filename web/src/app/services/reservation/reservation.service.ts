import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {ReservationListEntity, SimpleReservation} from '../../models/reservation.model';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {map} from 'rxjs/operators';
import {SessionService} from '../session/session.service';
import {Reservation, ReservationForm, RichReservation} from '../../core/models/reservation.model';
import {Projection} from '../../core/projections.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private readonly backendService: BackendService
  ) {
  }

  getAll(): Observable<RichReservation[]> {
    return this.backendService.getCollection<RichReservation>('reservations', 'reservations', {
      projection: Projection.RICH
    });
  }

  getSimpleByUser(userId: string): Observable<SimpleReservation[]> {
    return this.backendService.get<ReservationListEntity<SimpleReservation>>(`users/${userId}/reservations?projection=simple`, TokenRequirement.REQUIRED)
      .pipe(map(it => it._embedded.reservations));
  }

  save(reservation: ReservationForm): Observable<Reservation> {
    return this.backendService.postSingle('reservations', {
      ...reservation,
      abo: `/abos/${reservation.abo.id}`,
      user: `/users/${reservation.user.id}`,
      room: `/rooms/${reservation.room.id}`,
    });
  }
}
