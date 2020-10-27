import {Component, OnDestroy, OnInit} from '@angular/core';
import {AboService} from '../../../services/abo/abo.service';
import {PermissionService} from '../../../services/permission/permission.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {Router} from '@angular/router';
import {EagerSubject} from '../../../utils/EagerSubject';
import {RichAbo} from '../../../core/models/abo.model';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {build} from '../../../utils/global.extensions';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';

@Component({
  selector: 'component-abos-all',
  templateUrl: './abos-page.component.html',
  styleUrls: ['./abos-page.component.scss']
})
export class AbosPageComponent implements OnInit, OnDestroy {

  filteredItems = new EagerSubject<RichAbo[]>([]);
  canCreate: Observable<boolean>;

  constructor(
    private readonly aboService: AboService,
    private readonly permissionService: PermissionService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.aboService.getAll().pipe(
      switchMap(items => this.toolbarService.getFilterQuery().pipe(
        map(q => build({items, q}))
      ))
    ).subscribe(result => {
      this.filteredItems.next(result.items.filter(item =>
        `${item.title} ${item.description} ${item.user.givenName} ${item.user.familyName} ${item.user.principal} ${item.rooms.map(r => `${r.name} ${r.number}`).join(' ')}`
          .toLowerCase()
          .includes(result.q.toLowerCase())
      ));
    });

    this.toolbarService.enableSearch(true);
    this.toolbarService.setPageTitle('Abos');

    this.canCreate = this.permissionService.hasPermission({
      target: AclClassAlias.abo,
      action: AclAction.CREATE
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.enableSearch(false);
    this.toolbarService.clearPageTitle();
  }

  click(item: RichAbo) {
    this.router.navigate(['abos', item.id]).then();
  }

  create() {
    this.router.navigate(['abos', 'create']).then();
  }
}
