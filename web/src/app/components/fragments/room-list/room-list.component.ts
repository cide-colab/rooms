import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RichRoom, Room} from '../../../core/models/room.model';
import {SelectableListComponent} from '../../abstracts/selectable-list.component';

@Component({
  selector: 'component-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent extends SelectableListComponent<RichRoom> implements OnInit {

  @Input()
  items: RichRoom[];

  @Output()
  itemClick = new EventEmitter<RichRoom>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
