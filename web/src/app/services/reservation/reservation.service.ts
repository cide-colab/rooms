import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ReservationListEntity, SimpleReservation} from '../../models/reservation.model';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {map} from 'rxjs/operators';
import {SimpleAbo} from '../../models/abo.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private static createProtocol(reservation: SimpleReservation) {
    return {
      ...reservation,
      ...{
        room: reservation.room._links.self.href,
        user: reservation.user._links.self.href,
        abo: reservation.abo._links.self.href,
      }
    };
  }

  constructor(
    private backendService: BackendService
  ) {
  }

  getSimpleByUser(userId: string): Observable<SimpleReservation[]> {
    return this.backendService.get<ReservationListEntity<SimpleReservation>>(`users/${userId}/reservations?projection=simple`, TokenRequirement.REQUIRED)
      .pipe(map(it => it._embedded.reservations));
  }

  save(reservation: SimpleReservation): Observable<SimpleReservation> {
    return this.backendService.post('reservations', ReservationService.createProtocol(reservation), TokenRequirement.REQUIRED);
  }
}
