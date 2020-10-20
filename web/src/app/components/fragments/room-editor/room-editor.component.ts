import {Component, Input, OnInit} from '@angular/core';
import {RoomForm} from '../../../core/models/room.model';

@Component({
  selector: 'component-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.scss']
})
export class RoomEditorComponent implements OnInit {

  @Input()
  value: RoomForm = {
    id: undefined,
    number: '',
    imageUrl: '',
    description: '',
    department: undefined,
    name: ''
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
