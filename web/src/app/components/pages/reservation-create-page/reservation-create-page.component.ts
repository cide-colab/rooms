import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {ReservationService} from '../../../services/reservation/reservation.service';
import {ReservationForm} from '../../../core/models/reservation.model';

@Component({
  selector: 'component-reservation-create-page',
  templateUrl: './reservation-create-page.component.html',
  styleUrls: ['./reservation-create-page.component.scss']
})
export class ReservationCreatePageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly reservationService: ReservationService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location
  ) { }


  ngOnInit(): void {
    this.toolbarService.setPageTitle('Neue Buchung');
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

  save(form: ReservationForm) {
    this.reservationService.save(form).subscribe(
      next => {
        this.snackBar.open(`Buchung ${form.title} wurde erfolgreich erstellt`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Buchung ${form.title} konnte nicht erstellt werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.save(form));
      }
    );
  }

}
