import {Component, OnDestroy, OnInit} from '@angular/core';
import {EagerSubject} from '../../../utils/EagerSubject';
import {Observable} from 'rxjs';
import {DepartmentService} from '../../../services/department/department.service';
import {PermissionService} from '../../../services/permission/permission.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {Router} from '@angular/router';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';
import {map, switchMap} from 'rxjs/operators';
import {build} from '../../../utils/global.extensions';
import {RichDepartment} from '../../../core/models/department.model';

@Component({
  selector: 'component-departments',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.scss']
})
export class DepartmentsPageComponent implements OnInit, OnDestroy {

  filteredItems = new EagerSubject<RichDepartment[]>([]);
  canCreate: Observable<boolean>;

  constructor(
    private readonly departmentService: DepartmentService,
    private readonly permissionService: PermissionService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {

    this.departmentService.getAll().pipe(
      switchMap(items => this.toolbarService.getFilterQuery().pipe(
        map(q => build({items, q}))
      ))
    ).subscribe(result => {
      this.filteredItems.next(result.items.filter(item =>
        `${item.name} ${item.description}`
          .toLowerCase()
          .includes(result.q.toLowerCase())
      ));
    });

    this.toolbarService.enableSearch(true);
    this.toolbarService.setPageTitle('Abteilungen');

    this.canCreate = this.permissionService.hasPermission({
      target: AclClassAlias.department,
      action: AclAction.CREATE
    });
  }

  click(item: RichDepartment) {
    this.router.navigate(['departments', item.id]).then();
  }

  create() {
    this.router.navigate(['departments', 'create']).then();
  }

  ngOnDestroy(): void {
    this.toolbarService.enableSearch(false);
    this.toolbarService.clearPageTitle();
  }


}
