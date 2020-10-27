import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectableListComponent} from '../../abstracts/selectable-list.component';
import {RichAbo} from '../../../core/models/abo.model';

@Component({
  selector: 'component-abo-list',
  templateUrl: './abo-list.component.html',
  styleUrls: ['./abo-list.component.scss']
})
export class AboListComponent extends SelectableListComponent<RichAbo> implements OnInit {

  @Input()
  items: RichAbo[];

  @Output()
  itemClick = new EventEmitter<RichAbo>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
