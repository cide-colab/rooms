import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {AboService} from '../../../services/abo/abo.service';
import {AboForm} from '../../../core/models/abo.model';

@Component({
  selector: 'component-abo-create',
  templateUrl: './abo-create-page.component.html',
  styleUrls: ['./abo-create-page.component.scss']
})
export class AboCreatePageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly aboService: AboService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
  ) {
  }

  ngOnInit(): void {
    this.toolbarService.setPageTitle('Neues Abo');
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

  save(form: AboForm) {
    this.aboService.save(form).subscribe(
      next => {
        this.snackBar.open(`Abo ${form.title} für Nutzer ${form.user.principal} wurde erfolgreich erstellt`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Abo ${form.title} konnte nicht erstellt werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.save(form));
      }
    );
  }

}
