import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomForm} from '../../../core/models/room.model';
import {RoomService} from '../../../services/room/room.service';
import {MatDialog} from '@angular/material/dialog';
import {Route, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DepartmentForm} from '../../../core/models/department.model';
import {DepartmentService} from '../../../services/department/department.service';
import {Location} from '@angular/common';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';

@Component({
  selector: 'component-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss']
})
export class DepartmentCreateComponent implements OnInit, OnDestroy {

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

  save(form: DepartmentForm) {
    this.departmentService.save(form).subscribe(
      next => {
        this.snackBar.open(`Abteilung ${next.name} wurde erfolgreich erstellt`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Abteilung ${form.name} konnte nicht erstellt werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.save(form));
      }
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

}
