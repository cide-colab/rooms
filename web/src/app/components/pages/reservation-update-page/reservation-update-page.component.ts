import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ReservationService} from '../../../services/reservation/reservation.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ReservationForm} from '../../../core/models/reservation.model';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'component-reservation-update-page',
  templateUrl: './reservation-update-page.component.html',
  styleUrls: ['./reservation-update-page.component.scss']
})
export class ReservationUpdatePageComponent implements OnInit, OnDestroy {

  reservation: Observable<ReservationForm>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toolbarService: ToolbarService,
    private readonly reservationService: ReservationService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location
  ) { }

  ngOnInit(): void {
    this.reservation = this.route.params.pipe(
      map( params => params.id ),
      switchMap( id => this.reservationService.get(id)),
      tap(reservation => this.toolbarService.setPageTitle(`Buchung ${reservation.title} bearbeiten`))
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

  save(form: ReservationForm) {
    this.reservationService.update(form).subscribe(
      next => {
        this.snackBar.open(`Buchung ${next.title} wurde erfolgreich aktualisiert`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Buchung ${form.title} konnte nicht aktualisiert werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.save(form));
      }
    );
  }

}
