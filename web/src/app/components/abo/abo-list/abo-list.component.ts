import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SimpleAbo} from '../../../models/abo.model';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {Subject} from 'rxjs';
import {ListComponent} from '../../abstracts/list.component';

@Component({
  selector: 'component-abo-list',
  templateUrl: './abo-list.component.html',
  styleUrls: ['./abo-list.component.scss']
})
export class AboListComponent extends ListComponent<SimpleAbo> implements OnInit {

  @Input()
  showUsername = true;

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  filterItem(item: SimpleAbo, query: string): boolean {
    return `${item.rooms.map(room => `${room.name} ${room.number}`).join(' ')} ${item.user.principal} ${item.user.givenName}`
      .toLowerCase().includes(query.toLowerCase());
  }

}
