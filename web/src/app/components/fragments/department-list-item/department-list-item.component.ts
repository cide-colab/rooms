import {Component, Input, OnInit} from '@angular/core';
import {RichDepartment} from '../../../core/models/department.model';
import {SelectableComponent} from '../../abstracts/selectable.component';

@Component({
  selector: 'component-department-list-item',
  templateUrl: './department-list-item.component.html',
  styleUrls: ['./department-list-item.component.scss']
})
export class DepartmentListItemComponent extends SelectableComponent implements OnInit {

  @Input()
  department: RichDepartment;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
