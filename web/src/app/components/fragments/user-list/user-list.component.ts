import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectableListComponent} from '../../abstracts/selectable-list.component';
import {RichUser} from '../../../core/models/user.model';

@Component({
  selector: 'component-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends SelectableListComponent<RichUser> implements OnInit {

  @Input()
  items: RichUser[];

  @Output()
  itemClick = new EventEmitter<RichUser>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
