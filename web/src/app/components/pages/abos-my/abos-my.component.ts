import {Component, OnDestroy, OnInit} from '@angular/core';
import {EagerSubject} from '../../../utils/EagerSubject';
import {RichAbo} from '../../../core/models/abo.model';
import {Observable} from 'rxjs';
import {AboService} from '../../../services/abo/abo.service';
import {PermissionService} from '../../../services/permission/permission.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {build} from '../../../utils/global.extensions';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';

@Component({
  selector: 'component-abos-my',
  templateUrl: './abos-my.component.html',
  styleUrls: ['./abos-my.component.scss']
})
export class AbosMyComponent implements OnInit, OnDestroy {


  filteredItems = new EagerSubject<RichAbo[]>([]);
  canCreate: Observable<boolean>;

  constructor(
    private readonly aboService: AboService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.aboService.getAllForMe().pipe(
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
    this.toolbarService.setPageTitle('Meine Abos');
  }

  ngOnDestroy(): void {
    this.toolbarService.enableSearch(false);
    this.toolbarService.clearPageTitle();
  }

  click(item: RichAbo) {
    this.router.navigate(['abos', item.id]).then();
  }

}
