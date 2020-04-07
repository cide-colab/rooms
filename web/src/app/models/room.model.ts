import {Link, Links, ListLinks, RestEntity, RestListEntity} from './rest-entity.model';
import {BaseEntity} from './base-entity.model';
import {BaseDepartment} from './department.model';

export interface RoomLinks extends Links {
  department: Link;
  rooms: Link;
}

export interface BaseRoom extends RestEntity<RoomLinks>, BaseEntity {
  name: string;
  number: string;
  description: string;
  imageUrl: string;
}

export interface SimpleRoom extends BaseRoom {
  department: BaseDepartment;
}

export interface DetailedRoom extends BaseRoom {
  department: BaseDepartment;
}

// tslint:disable-next-line:no-empty-interface
export interface RoomListLinks extends ListLinks {
}

export interface RoomListEntity<T> extends RestListEntity<{ rooms: T[] }, RoomListLinks> {
}
