import {Component, OnInit} from '@angular/core';
import {BaseDepartment} from '../../models/department.model';
import {SessionService} from '../../services/session/session.service';
import {DepartmentService} from '../../services/department/department.service';
import {Router} from '@angular/router';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {SnackbarService} from '../../services/snackbar/snackbar.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'component-create-department',
  templateUrl: './create-department.page.html',
  styleUrls: ['./create-department.page.scss']
})
export class CreateDepartmentPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;


  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private readonly departmentService: DepartmentService
  ) {
  }

  ngOnInit(): void {
  }

  async onSubmit(department: BaseDepartment) {
    if (!await this.sessionService.hasPermission('create:department').pipe(take(1)).toPromise()) {
      this.snackbarService.open(TRANSLATION_KEYS.snackbar.unauthorized);
      return;
    }
    this.departmentService.save(department).subscribe(
      next => {
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.department.success, {name: department.name});
        this.router.navigate(['/departments']);
      },
      error => {
        console.log(error);
        this.snackbarService.open(TRANSLATION_KEYS.snackbar.create.department.failed, {name: department.name});
      }
    );
  }

}
