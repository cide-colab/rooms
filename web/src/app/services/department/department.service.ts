import {Injectable} from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {BaseDepartment} from '../../models/department.model';
import {Observable} from 'rxjs';
import {Department, DepartmentForm, RichDepartment} from '../../core/models/department.model';
import {AclAction} from '../../models/acl-entry.model';
import {Projection} from '../../core/projections.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private readonly backendService: BackendService) {
  }

  save(department: DepartmentForm): Observable<Department> {
    return this.backendService.postSingle('departments', {
      ...department
    });
  }

  getAll(): Observable<RichDepartment[]> {
    return this.backendService.getCollection('departments', 'departments', {
      projection: Projection.RICH
    });
  }

  get(id: string): Observable<RichDepartment> {
    return this.backendService.getSingle(`departments/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.backendService.deleteSingle(`departments/${id}`);
  }

  update(department: DepartmentForm): Observable<Department> {
    return this.backendService.patchSingle(`departments/${department.id}`, {
      ...department
    });
  }

  getAllByPermission(action: AclAction): Observable<Department[]> {
    return this.backendService.getCollection(`departments/search/byPermission`, 'departments', {
      action
    });
  }
}
