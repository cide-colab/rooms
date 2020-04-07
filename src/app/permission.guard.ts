import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SessionService} from './services/session/session.service';
import {SnackbarService} from './services/snackbar/snackbar.service';
import {TRANSLATION_KEYS} from '../app.translation-tree';
import {take} from 'rxjs/operators';

interface PermissionEntries {
  idKey?: string;
  type?: string;
  permission: string;
}

/*

    data: {
      // Permission && Permission
      entries: [
        {
          type: Department
          idKey: null,
          // Role || Role
          permissions: ['create:department']
        }
      ]
    }

 */

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const loggedIn: boolean = route.data.loggedIn;
    if (loggedIn) {
      if (!await this.sessionService.isLoggedIn()) {
        return this.router.parseUrl('');
      }
    }
    const entries: PermissionEntries[] = route.data.entries;
    if (!entries || entries.length <= 0) {
      return true;
    }

    for (const entry of entries) {
      const id = entry.idKey ? route.paramMap.get(entry.idKey) : null;
      if (await this.sessionService.hasPermission(entry.permission, id, entry.type).pipe(take(1)).toPromise()) {
        return true;
      }
    }
    this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
    return this.router.parseUrl('');
  }

}
