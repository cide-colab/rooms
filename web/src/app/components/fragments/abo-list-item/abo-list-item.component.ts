import {Component, Input, OnInit} from '@angular/core';
import {SelectableComponent} from '../../abstracts/selectable.component';
import {RichAbo} from '../../../core/models/abo.model';

@Component({
  selector: 'component-abo-list-item',
  templateUrl: './abo-list-item.component.html',
  styleUrls: ['./abo-list-item.component.scss']
})
export class AboListItemComponent extends SelectableComponent implements OnInit {

  @Input()
  abo: RichAbo;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
