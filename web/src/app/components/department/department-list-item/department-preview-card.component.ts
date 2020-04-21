import {Component, Input, OnInit} from '@angular/core';
import {BaseDepartment} from '../../../models/department.model';
import {cut} from '../../../app.utils';

@Component({
  selector: 'component-department-preview-card',
  templateUrl: './department-preview-card.component.html',
  styleUrls: ['./department-preview-card.component.scss']
})
export class DepartmentPreviewCardComponent implements OnInit {

  @Input()
  department: BaseDepartment;

  constructor() {
  }

  ngOnInit(): void {
  }

  getDescriptionPreview(): string {
    return cut(this.department.description, 60);
  }

}
