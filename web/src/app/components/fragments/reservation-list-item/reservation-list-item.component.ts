import {Component, Input, OnInit} from '@angular/core';
import {SelectableComponent} from '../../abstracts/selectable.component';
import {RichReservation} from '../../../core/models/reservation.model';

@Component({
  selector: 'component-reservation-list-item',
  templateUrl: './reservation-list-item.component.html',
  styleUrls: ['./reservation-list-item.component.scss']
})
export class ReservationListItemComponent extends SelectableComponent implements OnInit {

  @Input()
  reservation: RichReservation;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
