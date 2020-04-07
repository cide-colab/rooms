import {Injectable} from '@angular/core';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {BaseDepartment, DepartmentListEntity} from '../../models/department.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private readonly backendService: BackendService) {
  }

  save(department: BaseDepartment): Observable<BaseDepartment> {
    return this.backendService.post('departments', department, TokenRequirement.REQUIRED);
  }

  getAll(): Observable<BaseDepartment[]> {
    return this.backendService
      .get<DepartmentListEntity<BaseDepartment>>('departments', TokenRequirement.IF_LOGGED_IN).pipe(
        map(value => value._embedded.departments)
      );
  }

  get(id: string): Observable<BaseDepartment> {
    return this.backendService.get(`departments/${id}`, TokenRequirement.IF_LOGGED_IN);
  }

  delete(department: BaseDepartment): Observable<any> {
    return this.backendService.delete(department._links.self.href, TokenRequirement.REQUIRED);
  }

  update(department: BaseDepartment): Observable<BaseDepartment> {
    return this.backendService.patch(department._links.self.href, department, TokenRequirement.REQUIRED);
  }
}
