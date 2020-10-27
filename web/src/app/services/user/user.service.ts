import {Injectable} from '@angular/core';
import {BaseUser, SessionUser, UserListEntity} from '../../models/user.model';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RichUser, User} from '../../core/models/user.model';
import {RichRoom} from '../../core/models/room.model';
import {Projection} from '../../core/projections.model';
import {AclAction, AclClassAlias} from '../../models/acl-entry.model';
import {Department} from '../../core/models/department.model';

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

  getAll(): Observable<RichUser[]> {
    return this.backendService.getCollection<RichUser>('users', 'users', {
      projection: Projection.RICH
    });
  }

  getByAbo(id: number): Observable<RichUser> {
    return this.backendService.getSingle<RichUser>(`abos/${id}/user`, {
      projection: Projection.RICH
    });
  }

  get(id: number): Observable<RichUser> {
    return this.backendService.getSingle<RichUser>(`users/${id}`, {
      projection: Projection.RICH
    });
  }

  getAllByAclAction(action: AclAction): Observable<RichUser[]> {
    return this.backendService.getCollection(`users/search/byPermission`, 'users', {
      action,
      projection: Projection.RICH
    });
  }

  getAllByAclPermission(target: AclClassAlias, action: AclAction): Observable<RichUser[]> {
    return this.backendService.getCollection(`users/search/byTargetPermission`, 'users', {
      action,
      target,
      projection: Projection.RICH
    });
  }
}
