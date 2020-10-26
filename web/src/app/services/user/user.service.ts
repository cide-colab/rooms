import {Injectable} from '@angular/core';
import {BaseUser, SessionUser, UserListEntity} from '../../models/user.model';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RichUser, User} from '../../core/models/user.model';
import {RichRoom} from '../../core/models/room.model';
import {Projection} from '../../core/projections.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly backendService: BackendService) {
  }

  getMe(): Observable<User> {
    return this.backendService.get<User>('me', TokenRequirement.IF_LOGGED_IN);
  }

  getBase(userId: string): Observable<BaseUser> {
    return this.backendService.get<SessionUser>(`users/${userId}`, TokenRequirement.REQUIRED);
  }

  getAll(): Observable<BaseUser[]> {
    return this.backendService.get<UserListEntity<BaseUser>>('users', TokenRequirement.REQUIRED).pipe(
      map(value => value._embedded.users)
    );
  }

  getByAbo(id: number): Observable<RichUser> {
    return this.backendService.getSingle<RichUser>(`abos/${id}/user`, {
      projection: Projection.RICH
    });
  }
}
