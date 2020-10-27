import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DepartmentForm, RichDepartment} from '../../../core/models/department.model';
import {DepartmentService} from '../../../services/department/department.service';
import {Location} from '@angular/common';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';

@Component({
  selector: 'component-department-create',
  templateUrl: './department-create-page.component.html',
  styleUrls: ['./department-create-page.component.scss']
})
export class DepartmentCreatePageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly departmentService: DepartmentService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
    private readonly toolbarService: ToolbarService
  ) {
  }

  ngOnInit(): void {
    this.toolbarService.setPageTitle('Neue Abteilung');
  }

  save(department: DepartmentForm) {
    this.departmentService.save(department).subscribe(
      next => {
        this.snackBar.open(`Abteilung ${next.name} wurde erfolgreich erstellt`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Abteilung ${department.name} konnte nicht erstellt werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.save(department));
      }
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

}
