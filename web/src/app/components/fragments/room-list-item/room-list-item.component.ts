import {Component, Input, OnInit} from '@angular/core';
import {RichRoom} from '../../../core/models/room.model';
import {SelectableComponent} from '../../abstracts/selectable.component';

@Component({
  selector: 'component-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss']
})
export class RoomListItemComponent extends SelectableComponent implements OnInit {

  @Input()
  room: RichRoom;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
