import {Injectable} from '@angular/core';
import {BaseUser, SessionUser, UserListEntity} from '../../models/user.model';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseContingent, ContingentListEntity} from '../../models/contingent.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly backendService: BackendService) {
  }

  getBase(userId: string): Observable<BaseUser> {
    return this.backendService.get<SessionUser>(`users/${userId}`, TokenRequirement.REQUIRED);
  }

  getAll(): Observable<BaseUser[]> {
    return this.backendService.get<UserListEntity<BaseUser>>('users', TokenRequirement.REQUIRED).pipe(
      map(value => value._embedded.users)
    );
  }

  getContingents(userId: string, roomId?: string, date?: Date): Observable<BaseContingent[]> {
    const params = [];
    if (date) {
      params.push(`date=${encodeURIComponent(moment(date).format())}`);
    }
    if (roomId) {
      params.push(`room=${roomId}`);
    }
    const paramString = `${params.length > 0 ? '?' : ''}${params.join('&')}`;
    return this.backendService.get<ContingentListEntity<BaseContingent>>(`users/${userId}/contingents${paramString}`, TokenRequirement.REQUIRED).pipe(
      map(value => value._embedded.contingents)
    );
  }
}
