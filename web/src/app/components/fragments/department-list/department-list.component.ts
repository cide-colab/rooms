import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectableListComponent} from '../../abstracts/selectable-list.component';
import {RichDepartment} from '../../../core/models/department.model';

@Component({
  selector: 'component-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent extends SelectableListComponent<RichDepartment> implements OnInit {

  @Input()
  items: RichDepartment[];

  @Output()
  itemClick = new EventEmitter<RichDepartment>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
