import {Component, OnInit} from '@angular/core';
import {BaseDepartment} from '../../../models/department.model';
import {SimpleRoom} from '../../../models/room.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormComponent} from '../../abstracts/form.component';
import {DepartmentService} from '../../../services/department/department.service';
import {AppValidators} from '../../../app.validator';
import {Observable} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {SessionService} from '../../../services/session/session.service';

@Component({
  selector: 'component-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent extends FormComponent<SimpleRoom> implements OnInit {

  departments: Observable<BaseDepartment[]>;
  filteredDepartments: Observable<BaseDepartment[]>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly departmentService: DepartmentService,
    private readonly sessionService: SessionService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    // this.departments = this.departmentService.getAll()
    //   .pipe(map(departments =>
    //     departments.filter(department => this.sessionService.hasPermission('create:room', department.id))
    //   ));


    this.filteredDepartments = this.formControls.department.valueChanges.pipe(
      debounceTime(200),
      map(value => typeof value === 'string' ? value : this.displayDepartment(value)),
      switchMap(value => this.filterBy(value))
    );
  }

  displayDepartment(department: BaseDepartment): string {
    return department ? `${department.name}` : '';
  }

  filterBy(value: string): Observable<BaseDepartment[]> {
    return this.departments.pipe(
      map(departments => departments.filter(department => this.displayDepartment(department).toLowerCase().includes(value.toLowerCase())))
    );
  }

  getFormGroup(value: SimpleRoom): FormGroup {
    return this.formBuilder.group({
      name: [value.name, Validators.required],
      number: [value.number, Validators.required],
      imageUrl: [value.imageUrl, Validators.required],
      description: [value.description, Validators.maxLength(512)],
      department: [value.department, [Validators.required, AppValidators.requireSelect]],
    });
  }

  getDefaultValue(): SimpleRoom {
    return {
      name: '',
      number: '',
      description: '',
      department: undefined,
      imageUrl: 'http://swasti.org/wp-content/plugins/awsm-team-pro/images/default-user.png'
    };
  }

}
