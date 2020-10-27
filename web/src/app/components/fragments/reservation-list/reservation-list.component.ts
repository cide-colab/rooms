import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectableListComponent} from '../../abstracts/selectable-list.component';
import {RichReservation} from '../../../core/models/reservation.model';

@Component({
  selector: 'component-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent extends SelectableListComponent<RichReservation> implements OnInit {

  @Input()
  items: RichReservation[];

  @Output()
  itemClick = new EventEmitter<RichReservation>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
