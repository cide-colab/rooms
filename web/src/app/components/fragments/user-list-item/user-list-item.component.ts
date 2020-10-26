import {Component, Input, OnInit} from '@angular/core';
import {SelectableComponent} from '../../abstracts/selectable.component';
import {RichUser} from '../../../core/models/user.model';

@Component({
  selector: 'component-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent extends SelectableComponent implements OnInit {

  @Input()
  user: RichUser;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
