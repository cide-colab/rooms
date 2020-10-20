import {Injectable} from '@angular/core';
import {BaseUser, SessionUser, UserListEntity} from '../../models/user.model';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../core/models/user.model';

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
}
