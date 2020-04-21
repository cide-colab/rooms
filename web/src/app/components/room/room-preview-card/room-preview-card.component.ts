import {Component, Input, OnInit} from '@angular/core';
import {SimpleRoom} from '../../../models/room.model';
import {cut} from '../../../app.utils';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SelectableComponent} from '../../abstracts/selectable.component';

@Component({
  selector: 'component-room-preview-card',
  templateUrl: './room-preview-card.component.html',
  styleUrls: ['./room-preview-card.component.scss']
})
export class RoomPreviewCardComponent extends SelectableComponent implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  @Input()
  room: SimpleRoom;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getDescriptionPreview(): string {
    return cut(this.room.description, 60);
  }

}
