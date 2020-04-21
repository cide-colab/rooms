import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {ListComponent} from '../../abstracts/list.component';
import {SimpleReservation} from '../../../models/reservation.model';

@Component({
  selector: 'component-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent extends ListComponent<SimpleReservation> implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  filterItem(item: SimpleReservation, query: string): boolean {
    return `${item.room.name} ${item.room.number} ${item.user.principal} ${item.user.givenName}`
      .toLowerCase().includes(query.toLowerCase());
  }

}
