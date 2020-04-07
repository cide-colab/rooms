import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../services/session/session.service';
import {DepartmentService} from '../../services/department/department.service';
import {BaseDepartment} from '../../models/department.model';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'page-department-list',
  templateUrl: './department-list.page.html',
  styleUrls: ['./department-list.page.scss']
})
export class DepartmentListPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  canCreate = false;
  departments: Observable<BaseDepartment[]>;
  filteredDepartments: BaseDepartment[];

  constructor(
    private readonly sessionService: SessionService,
    private readonly departmentService: DepartmentService
  ) {
  }

  ngOnInit() {
    this.sessionService.hasPermission('create:department').subscribe(canCreate => this.canCreate = canCreate);
    this.departments = this.departmentService.getAll().pipe(
      tap(department => this.onSearch('', department))
    );
  }

  onSearch(text: string, departments: BaseDepartment[]) {
    if (!this.departments) {
      return;
    }
    if (!text || text.length === 0) {
      this.filteredDepartments = departments.slice();
    } else {
      this.filteredDepartments = departments.filter(department => department.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    }
  }
}
