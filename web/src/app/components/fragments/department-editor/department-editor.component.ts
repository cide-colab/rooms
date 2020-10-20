import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DepartmentForm} from '../../../core/models/department.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditorComponent} from '../../abstracts/editor.component';

@Component({
  selector: 'component-department-editor',
  templateUrl: './department-editor.component.html',
  styleUrls: ['./department-editor.component.scss']
})
export class DepartmentEditorComponent extends EditorComponent<DepartmentForm> implements OnInit {

  @Input()
  default: DepartmentForm = {
    id: undefined,
    imageUrl: '',
    name: '',
    description: ''
  };

  formGroup: FormGroup;

  constructor(private readonly builder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.builder.group({
      id: [{value: this.default.id, disabled: true}],
      name: [this.default.name, Validators.required],
      imageUrl: [this.default.imageUrl],
      description: [this.default.description, Validators.maxLength(512)],
    });
  }
}
