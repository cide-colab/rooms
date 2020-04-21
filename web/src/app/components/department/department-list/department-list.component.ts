import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {BaseDepartment} from '../../../models/department.model';
import {ListComponent} from '../../abstracts/list.component';

@Component({
  selector: 'component-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent extends ListComponent<BaseDepartment> implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  filterItem(item: BaseDepartment, query: string): boolean {
    return item.name.toLowerCase().includes(query.toLowerCase());
  }

}
