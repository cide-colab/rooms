import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session/session.service';
import {DepartmentService} from '../../../services/department/department.service';
import {BaseDepartment} from '../../../models/department.model';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {Subject} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-department-list',
  templateUrl: './department-list.page.html',
  styleUrls: ['./department-list.page.scss']
})
export class DepartmentListPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  canCreate = false;
  departments = new Subject<BaseDepartment[]>();

  constructor(
    private readonly sessionService: SessionService,
    private readonly departmentService: DepartmentService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.sessionService.hasPermission('create:department').subscribe(canCreate => this.canCreate = canCreate);
    this.departmentService.getAll().subscribe(
      next => this.departments.next(next),
      error => {
        console.log(error);
        this.translateService.get(TRANSLATION_KEYS.department.multi)
          .pipe(mergeMap(it => this.translateService.get(TRANSLATION_KEYS.error.failed_to_fetch, {class: it})))
          .subscribe(msg => this.snackBar.open(msg));
      }
    );
  }

  onItemClicked(item: BaseDepartment) {
    this.router.navigate(['/', 'departments', item.id]);
  }
}
