import {Component, Input, OnInit} from '@angular/core';
import {SimpleReservation} from '../../../models/reservation.model';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {cut} from '../../../app.utils';

export type ReservationPreviewCardMode = 'private' | 'public';

@Component({
  selector: 'component-reservation-preview-card',
  templateUrl: './reservation-preview-card.component.html',
  styleUrls: ['./reservation-preview-card.component.scss']
})
export class ReservationPreviewCardComponent implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  @Input()
  reservation: SimpleReservation;

  @Input()
  mode: ReservationPreviewCardMode;

  constructor() {
  }

  ngOnInit(): void {
  }

  getCuttedDescription() {
    return cut(this.reservation.description);
  }
}
