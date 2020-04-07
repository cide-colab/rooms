import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ReservationListEntity, SimpleReservation} from '../../models/reservation.model';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private backendService: BackendService
  ) {
  }

  getSimpleByUser(userId: string): Observable<SimpleReservation[]> {
    return this.backendService.get<ReservationListEntity<SimpleReservation>>(`users/${userId}/reservations?projection=simple`, TokenRequirement.REQUIRED)
      .pipe(map(it => it._embedded.reservations));
  }
}
