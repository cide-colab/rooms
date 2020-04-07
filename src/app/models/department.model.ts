import {Link, Links, ListLinks, RestEntity, RestListEntity} from './rest-entity.model';
import {BaseEntity} from './base-entity.model';

export interface DepartmentLinks extends Links {
  department: Link;
  rooms: Link;
}

export interface BaseDepartment extends RestEntity<DepartmentLinks>, BaseEntity {
  name: string;
  description: string;
  imageUrl: string;
}

export interface SimpleDepartment extends BaseDepartment {

}

export interface DetailedDepartment extends BaseDepartment {

}

// tslint:disable-next-line:no-empty-interface
export interface DepartmentListLinks extends ListLinks {
}

export interface DepartmentListEntity<T> extends RestListEntity<{ departments: T[] }, DepartmentListLinks> {
}
