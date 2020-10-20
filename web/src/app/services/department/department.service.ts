import {Injectable} from '@angular/core';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {BaseDepartment, DepartmentListEntity} from '../../models/department.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DepartmentForm, RichDepartment} from '../../core/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private readonly backendService: BackendService) {
  }

  save(department: DepartmentForm): Observable<BaseDepartment> {
    return this.backendService.post('departments', department, TokenRequirement.REQUIRED);
  }

  getAll(): Observable<RichDepartment[]> {
    return this.backendService.getCollection('departments?projection=rich', 'departments');
  }

  get(id: string): Observable<RichDepartment> {
    return this.backendService.getSingle(`departments/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.backendService.deleteSingle(`departments/${id}`);
  }

  update(department: BaseDepartment): Observable<BaseDepartment> {
    return this.backendService.patch(department._links.self.href, department, TokenRequirement.REQUIRED);
  }
}
