import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RichRoom} from '../../../core/models/room.model';
import {RoomService} from '../../../services/room/room.service';
import {EagerSubject} from '../../../utils/EagerSubject';
import {map, switchMap} from 'rxjs/operators';
import {PermissionService} from '../../../services/permission/permission.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {build} from '../../../utils/global.extensions';
import {Router} from '@angular/router';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';

@Component({
  selector: 'component-rooms',
  templateUrl: './room-list-page.component.html',
  styleUrls: ['./room-list-page.component.scss']
})
export class RoomListPageComponent implements OnInit, OnDestroy {

  filteredItems = new EagerSubject<RichRoom[]>([]);
  canCreate: Observable<boolean>;

  constructor(
    private readonly roomService: RoomService,
    private readonly permissionService: PermissionService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.roomService.getAll().pipe(
      switchMap(items => this.toolbarService.getFilterQuery().pipe(
        map(q => build({items, q}))
      ))
    ).subscribe(result => {
      this.filteredItems.next(result.items.filter(item =>
        `${item.name} ${item.description} ${item.department.name}`
          .toLowerCase()
          .includes(result.q.toLowerCase())
      ));
    });

    this.toolbarService.enableSearch(true);
    this.toolbarService.setPageTitle('Räume');

    this.canCreate = this.permissionService.hasPermission({
      target: AclClassAlias.room,
      action: AclAction.CREATE
    });
  }

  click(item: RichRoom) {
    this.router.navigate(['rooms', item.id]).then();
  }

  create() {
    this.router.navigate(['rooms', 'create']).then();
  }

  ngOnDestroy(): void {
    this.toolbarService.enableSearch(false);
    this.toolbarService.clearPageTitle();
  }
}
