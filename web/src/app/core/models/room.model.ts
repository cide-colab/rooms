import {Identity} from './identity';
import {Department} from './department.model';

export interface RoomModel {
  number: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface Room extends RoomModel, Identity {}

export interface RichRoom extends RoomModel, Identity {
  department: Department;
}

export interface RoomForm extends RoomModel, Identity {
  department: string;
}
