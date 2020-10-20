import {Component, Input, OnInit} from '@angular/core';
import {RoomForm} from '../../../core/models/room.model';
import {EditorComponent} from '../../abstracts/editor.component';
import {Department} from '../../../core/models/department.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/department/department.service';
import {Observable} from 'rxjs';
import {AclAction} from '../../../models/acl-entry.model';
import {debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {strict} from 'assert';

@Component({
  selector: 'component-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.scss']
})
export class RoomEditorComponent extends EditorComponent<RoomForm> implements OnInit {

  @Input()
  default: RoomForm = {
    id: undefined,
    name: '',
    number: '',
    imageUrl: '',
    description: '',
    department: ''
  };

  formGroup: FormGroup;

  filteredDepartments: Observable<Department[]>;

  constructor(
    private readonly builder: FormBuilder,
    private readonly departmentService: DepartmentService
  ) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.builder.group({
      id: [{value: this.default.id, disabled: true}],
      name: [this.default.name, Validators.required],
      number: [this.default.number, Validators.required],
      imageUrl: [this.default.imageUrl],
      description: [this.default.description, Validators.maxLength(512)],
      department: [this.default.department, Validators.required]
    });

    this.filteredDepartments = this.departmentService.getAllByPermission(AclAction.CREATE).pipe(
      tap(departments => console.log(departments)),
      switchMap( departments => this.formGroup.controls.department.valueChanges.pipe(
        debounceTime(200),
        map(value => typeof value === 'string' ? value : this.displayDepartment(value)),
        map( query => departments.filter(department => this.filter(department, query)))
      ))
    );

  }

  displayDepartment(department: Department): string {
    return department ? `${department.name}` : '';
  }

  private filter(department: Department, query: string): boolean {
    return this.displayDepartment(department).toLowerCase().includes(query.toLowerCase())
    || query === department._links.self.href;
  }

  toForm(formGroup: FormGroup): RoomForm {
    const value = formGroup.getRawValue();
    return {
      ...value,
      department: this.toHref(value.department)
    };
  }
}
