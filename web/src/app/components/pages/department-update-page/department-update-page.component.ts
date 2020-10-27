import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {DepartmentService} from '../../../services/department/department.service';
import {Observable} from 'rxjs';
import {DepartmentForm, RichDepartment} from '../../../core/models/department.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'component-department-update',
  templateUrl: './department-update-page.component.html',
  styleUrls: ['./department-update-page.component.scss']
})
export class DepartmentUpdatePageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location
  ) { }

  departmentForm: Observable<DepartmentForm>;

  private static toForm(department: RichDepartment): DepartmentForm {
    return {
      id: department.id,
      name: department.name,
      description: department.description,
      imageUrl: department.imageUrl
    };
  }

  ngOnInit(): void {
    this.departmentForm = this.route.params.pipe(
      map( params => params.id),
      switchMap( id => this.departmentService.get(id)),
      tap( department => this.toolbarService.setPageTitle(`Abteilung ${department.name} bearbeiten`)),
      map( department => DepartmentUpdatePageComponent.toForm(department))
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

  update(form: DepartmentForm) {
    this.departmentService.update(form).subscribe(
      next => {
        this.snackBar.open(`Abteilung ${next.name} wurde erfolgreich aktualisiert`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Abteilung ${form.name} konnte nicht aktualisiert werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.update(form));
      }
    );
  }
}
