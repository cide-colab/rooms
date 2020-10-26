import {Injectable} from '@angular/core';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {AboListEntity, BaseAbo, DetailedAbo, SimpleAbo} from '../../models/abo.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseContingent, ContingentListEntity} from '../../models/contingent.model';
import * as moment from 'moment';
import {RestEntity} from '../../models/rest-entity.model';
import {Room} from '../../core/models/room.model';
import {Abo, AboForm, RichAbo} from '../../core/models/abo.model';
import {Projection} from '../../core/projections.model';
import {Department} from '../../core/models/department.model';

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

  save(abo: AboForm): Observable<Abo> {
    return this.backendService.postSingle('abos', {
      ...abo,
      user: `/users/${abo.user.id}`,
      rooms: abo.rooms.map(r => `/rooms/${r.id}`)
    });
  }

  getAll(): Observable<RichAbo[]> {
    return this.backendService.getCollection<RichAbo>('abos', 'abos', {
      projection: Projection.RICH
    });
  }

  get(id: string): Observable<RichAbo> {
    return this.backendService.getSingle(`abos/${id}`, {
      projection: Projection.RICH
    });
  }

  getAllForMe(): Observable<RichAbo[]> {
    return this.backendService.getCollection<RichAbo>(`me/abos`, 'abos', {
      projection: Projection.RICH
    });
  }

  delete(id: number): Observable<any> {
    return this.backendService.deleteSingle(`abos/${id}`);
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
}
