import {Injectable} from '@angular/core';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {HttpClient} from '@angular/common/http';
import {KeycloakService} from 'keycloak-angular';
import {PermissionCheckForm} from '../../models/acl-entry.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BackendService {

  constructor(httpClient: HttpClient, keycloakService: KeycloakService) {
    super(httpClient, keycloakService);
  }

  //
  // private acl: AclEntryModel[] = [];
  // private dirty = true;

  public hasPermission(form: PermissionCheckForm): Observable<boolean> {
    return this.post('permissions/check', form, TokenRequirement.IF_LOGGED_IN);
  }

  //
  // public setDirty() {
  //   this.dirty = true;
  // }
  //
  // private getAcl(): Observable<AclEntryModel[]> {
  //   if (this.dirty) {
  //     return this.getCollection<AclEntryModel>('permissions/acl', 'entries', TokenRequirement.IF_LOGGED_IN)
  //       .pipe(
  //         map(result => result._embedded.entries),
  //         tap(entries => this.acl = entries),
  //         tap(entries => this.dirty = false)
  //       );
  //   } else {
  //     return of(this.acl);
  //   }
  // }
  //
  // public hasPermission(action: AclAction, targetClass: string, contextClass: string, contextId: number): Observable<boolean> {
  //   const predicate: (AclEntryModel) => boolean = e => {
  //     return e.action === action && e.targetClass === targetClass && contextClass === contextClass && contextId === contextId;
  //   };
  //   return this.getAcl().pipe(map(values => values.find(predicate) !== null));
  // }

}

// export function any<T>(predicate: (value: T) => boolean): OperatorFunction<T[], boolean> {
//   return function filterOperatorFunction(source: Observable<T[]>): Observable<boolean> {
//     return source.pipe(
//       concatMap<T[], Observable<boolean>>(values => {
//         return of(values.find(predicate) !== null);
//       })
//     );
//   };
// }
