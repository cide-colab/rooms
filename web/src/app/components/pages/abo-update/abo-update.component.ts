import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {AboService} from '../../../services/abo/abo.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {AboForm} from '../../../core/models/abo.model';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'component-abo-update',
  templateUrl: './abo-update.component.html',
  styleUrls: ['./abo-update.component.scss']
})
export class AboUpdateComponent implements OnInit, OnDestroy {

  abo: Observable<AboForm>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toolbarService: ToolbarService,
    private readonly aboService: AboService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
  ) {
  }

  ngOnInit(): void {
    this.abo = this.route.params.pipe(
      map( params => params.id),
      switchMap( id => this.aboService.get(id)),
      tap( abo => this.toolbarService.setPageTitle(`Abo ${abo.title} Bearbeiten`))
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

  save(form: AboForm) {
    this.aboService.update(form).subscribe(
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
