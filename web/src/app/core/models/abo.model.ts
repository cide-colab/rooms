import {Identity} from './identity';
import {User} from './user.model';
import {Room} from './room.model';
import {DepartmentModel} from './department.model';

export interface AboModel {
  title: string;
  start: string;
  end: string;
  contingent: number;
  unlimited_end: boolean;
  unlimited_contingent: boolean;
  description: string;
}

export interface Abo extends AboModel, Identity {
}
export interface RichAbo extends AboModel, Identity {
  rooms: Room[];
  user: User;
  roomCount: number;
  reservationCount: number;
}
export interface AboForm extends AboModel, Identity {
  user: User;
  rooms: Room[];
}
