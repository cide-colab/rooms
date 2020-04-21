import {Component, Input, OnInit} from '@angular/core';
import {SimpleRoom} from '../../../models/room.model';

@Component({
  selector: 'component-room-preview-small',
  templateUrl: './room-preview-small.component.html',
  styleUrls: ['./room-preview-small.component.scss']
})
export class RoomPreviewSmallComponent implements OnInit {

  @Input()
  room: SimpleRoom;

  constructor() {
  }

  ngOnInit(): void {
  }

}
