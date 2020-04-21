import {Component, Input, OnInit} from '@angular/core';
import {SimpleReservation} from '../../../models/reservation.model';

export type ReservationPreviewCardMode = 'private' | 'public';

@Component({
  selector: 'component-reservation-preview-card',
  templateUrl: './reservation-preview-card.component.html',
  styleUrls: ['./reservation-preview-card.component.scss']
})
export class ReservationPreviewCardComponent implements OnInit {

  @Input()
  reservation: SimpleReservation;

  @Input()
  mode: ReservationPreviewCardMode;

  constructor() {
  }

  ngOnInit(): void {
  }

}
