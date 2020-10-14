import {Component, OnInit} from '@angular/core';
import {PermissionService} from '../../../services/permission/permission.service';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';

interface MenuItem {
  title: string;
  image: string;
  url: string;
}

@Component({
  selector: 'component-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  items: MenuItem[];

  constructor(
    private readonly permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    let tmpItems: MenuItem[] = [];

    if (this.permissionService.hasPermission({action: AclAction.READ, target: AclClassAlias.room})) {
      tmpItems = [...tmpItems, {image: null, title: 'Rooms', url: '/rooms'}];
    }

    if (this.permissionService.hasPermission({action: AclAction.READ, target: AclClassAlias.department})) {
      tmpItems = [...tmpItems, {image: null, title: 'Departments', url: '/departments'}];
    }

    this.items = tmpItems
  }

}
