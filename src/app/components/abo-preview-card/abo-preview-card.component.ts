import {Component, Input, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {SimpleAbo} from '../../models/abo.model';

@Component({
  selector: 'component-abo-preview-card',
  templateUrl: './abo-preview-card.component.html',
  styleUrls: ['./abo-preview-card.component.scss']
})
export class AboPreviewCardComponent implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  @Input()
  abo: SimpleAbo;

  @Input()
  showUsername = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
