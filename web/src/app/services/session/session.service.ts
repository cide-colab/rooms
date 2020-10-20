import {Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {Session} from '../../models/session.model';
import {from, Observable, of, Subject} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {User} from '../../core/models/user.model';
import {EagerSubject, ValueCache} from '../../utils/EagerSubject';
import {compilePipeFromMetadata} from '@angular/compiler';


@Injectable()
export class SessionService {

  constructor(
    private readonly backendService: BackendService,
    private readonly keycloakService: KeycloakService
  ) {
  }

  private static SESSION_KEY = 'rooms.session';

  private sessionUser = new EagerSubject<User | undefined>(undefined);
  private sessionUserCache = new ValueCache<User>('rooms.session.user');

  private static getCachedSession(): Session {
    return JSON.parse(localStorage.getItem(SessionService.SESSION_KEY));
  }

  private static cacheSession(session: Session) {
    return localStorage.setItem(SessionService.SESSION_KEY, JSON.stringify(session));
  }

  private static removeCachedSession() {
    localStorage.removeItem(SessionService.SESSION_KEY);
  }

  public login() {
    this.keycloakService.login().then();
  }

  public logout() {
    SessionService.removeCachedSession();
    this.sessionUserCache.clear();
    // this.keycloakService.logout().then();
  }

  public getSessionUser(forceReload: boolean = false): Observable<User | undefined> {
    if (forceReload || !this.sessionUserCache.hasValue()) {
      this.fetchSessionUser();
    }
    return this.sessionUser;
  }

  private fetchSessionUser() {
    this.backendService.get<User>('me', TokenRequirement.IF_LOGGED_IN)
      .subscribe(user => {
        this.updateSessionUser(user);
      });
  }

  private updateSessionUser(user: User) {
    this.sessionUserCache.update(user);
    this.sessionUser.next(user);
  }

  public async isLoggedIn(): Promise<boolean> {
    return (await this.getSession().pipe(take(1)).toPromise()).userId !== null;
  }

  public hasPermission(permission: string = null, id: string = null, type: string = null, force: boolean = false): Observable<boolean> {
    return this.getSession(force).pipe(
      map(session => session.acl.find(entry =>
          // (permission === null || permission === entry.permission)
          // && (type === null || type === entry.type)
          // && (id === null || id === entry.id)
          true
        ) !== undefined
      )
    );
  }

  public hasPermissionPromise(permission: string = null, id: string = null, type: string = null, force: boolean = false): Promise<boolean> {
    return this.hasPermission(permission, id, type, force).pipe(take(1)).toPromise();
  }

  public hasPermissionForAll(
    permission: string = null,
    ids: string[] = [],
    type: string = null,
    force: boolean = false
  ): Observable<boolean> {
    const authorized: Promise<boolean> = new Promise<boolean>(async resolve => {
      {
        for (const id of ids) {
          if (await this.hasPermission(permission, id, type, force).pipe(take(1)).toPromise()) {
            resolve(true);
            return;
          }
        }
        resolve(false);
        return;
      }
    });
    return from(authorized);
  }

  public hasPermissionForAllPromise(
    permission: string = null,
    ids: string[] = [],
    type: string = null,
    force: boolean = false
  ): Promise<boolean> {
    return this.hasPermissionForAll(permission, ids, type, force).pipe(take(1)).toPromise();
  }

  // public hasAnyPermission(permission: string = null, type: string = null, force: boolean = false): Observable<boolean> {
  //   return this.getSession(force).pipe(
  //     map(session => session.acl.find(entry =>
  //       (permission == null || permission === entry.permission)
  //       && (type === null || type === entry.type)
  //       ) !== undefined
  //     )
  //   );
  // }

  public getSession(force: boolean = false): Observable<Session> {
    const session = SessionService.getCachedSession();
    if (force || !session) {
      return this.backendService.get<Session>('users/session', TokenRequirement.IF_LOGGED_IN).pipe(
        tap(newSession => SessionService.cacheSession(newSession))
      );
    }
    return of(session);
  }
}
