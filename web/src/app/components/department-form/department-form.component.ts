import {Component} from '@angular/core';
import {BaseDepartment} from '../../models/department.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormComponent} from '../abstracts/form.component';

@Component({
  selector: 'component-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent extends FormComponent<BaseDepartment> {

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  getFormGroup(value: BaseDepartment): FormGroup {
    return this.formBuilder.group({
      name: [value.name, Validators.required],
      imageUrl: [value.imageUrl, Validators.required],
      description: [value.description, Validators.maxLength(512)],
    });
  }

  getDefaultValue(): BaseDepartment {
    return {
      name: '',
      imageUrl: 'http://swasti.org/wp-content/plugins/awsm-team-pro/images/default-user.png',
      description: ''
    };
  }

}
