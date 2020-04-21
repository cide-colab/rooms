import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {ListComponent} from '../../abstracts/list.component';
import {SimpleRoom} from '../../../models/room.model';

@Component({
  selector: 'component-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent extends ListComponent<SimpleRoom> implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  filterItem(item: SimpleRoom, query: string): boolean {
    return `${item.name} ${item.number} ${item.department.name}`.toLowerCase().includes(query.toLowerCase());
  }

}
