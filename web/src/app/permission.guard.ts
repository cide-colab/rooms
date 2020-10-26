import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SessionService} from './services/session/session.service';
import {SnackbarService} from './services/snackbar/snackbar.service';
import {TRANSLATION_KEYS} from '../app.translation-tree';
import {PermissionService} from './services/permission/permission.service';
import {AclClassAlias, PermissionCheckForm, RoutingPermission} from './models/acl-entry.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly permissionService: PermissionService
  ) {
  }

  private static async toPermissionForm(permission: RoutingPermission, route: ActivatedRouteSnapshot): Promise<PermissionCheckForm> {
    const form: PermissionCheckForm = {
      action: permission.action,
      target: permission.target
    };
    if (permission.context) {
      const id = permission.context.objectClass === AclClassAlias.application ? 0 : await route.params[permission.context.objectIdAttr];
      form.context = {
        objectClass: permission.context.objectClass,
        objectId: id
      };
    }
    return form;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const permission: RoutingPermission = route.data.permission;
    if (!permission) {
      return true;
    }

    const form = await PermissionGuard.toPermissionForm(permission, route);
    if (await this.permissionService.hasPermission(form).toPromise()) {
      return true;
    }

    this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
    return this.router.parseUrl('');
  }
}
