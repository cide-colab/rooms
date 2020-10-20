import {Identity} from './identity';

export interface DepartmentModel {
  name: string;
  description: string;
  imageUrl: string;
}

export interface Department extends DepartmentModel, Identity {}
export interface RichDepartment extends DepartmentModel, Identity {}

export interface DepartmentForm extends DepartmentModel, Identity {}
