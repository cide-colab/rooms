import {Injectable} from '@angular/core';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {AboListEntity, BaseAbo, DetailedAbo, SimpleAbo} from '../../models/abo.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseContingent, ContingentListEntity} from '../../models/contingent.model';
import * as moment from 'moment';
import {RestEntity} from '../../models/rest-entity.model';
import {Room} from '../../core/models/room.model';
import {RichAbo} from '../../core/models/abo.model';
import {Projection} from '../../core/projections.model';

@Injectable({
  providedIn: 'root'
})
export class AboService {

  constructor(private readonly backendService: BackendService) {
  }

  private static createProtocol(abo: SimpleAbo) {
    return {
      ...abo,
      ...{
        rooms: abo.rooms.map(room => room._links.self.href),
        user: abo.user._links.self.href
      }
    };
  }

  save(abo: SimpleAbo): Observable<SimpleAbo> {
    return this.backendService.post('abos', AboService.createProtocol(abo), TokenRequirement.REQUIRED);
  }

  getAll(): Observable<RichAbo[]> {
    return this.backendService.getCollection<RichAbo>('abos', 'abos', {
      projection: Projection.RICH
    });
  }

  get(id: string): Observable<DetailedAbo> {
    return this.backendService.get(`abos/${id}?projection=detailed`, TokenRequirement.REQUIRED);
  }

  delete(abo: DetailedAbo): Observable<any> {
    return this.backendService.delete(`abos/${abo.id}`, TokenRequirement.REQUIRED);
  }

  update(abo: DetailedAbo): Observable<BaseAbo> {
    return this.backendService.patch(`abos/${abo.id}`, AboService.createProtocol(abo), TokenRequirement.REQUIRED);
  }

  getSimpleByUser(id: string): Observable<SimpleAbo[]> {
    return this.backendService.get<AboListEntity<SimpleAbo>>(`users/${id}/abos?projection=simple`, TokenRequirement.REQUIRED)
      .pipe(map(value => value._embedded.abos));
  }

  getBaseByUser(id: string): Observable<SimpleAbo[]> {
    return this.backendService.get<AboListEntity<SimpleAbo>>(`users/${id}/abos`, TokenRequirement.REQUIRED)
      .pipe(map(value => value._embedded.abos));
  }

  getContingentOnDate(id: string, date: Date): Observable<BaseContingent> {
    return this.backendService.get<BaseContingent>(
      `abos/${id}/contingent?date=${encodeURIComponent(moment(date).format())}`,
      TokenRequirement.REQUIRED
    );
  }

  getRooms(id: number): Observable<Room[]> {
    return this.backendService.getCollection<Room>(`abos/${id}/rooms`, 'rooms');
  }
}
