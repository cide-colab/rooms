import {Link, Links, ListLinks, RestEntity, RestListEntity} from './rest-entity.model';
import {BaseEntity} from './base-entity.model';
import {BaseUser} from './user.model';
import {BaseRoom, DetailedRoom} from './room.model';

export interface ReservationLinks extends Links {
  room: Link;
  user: Link;
}

export interface BaseReservation extends RestEntity<ReservationLinks>, BaseEntity {
  title: string;
  description?: string;
  start: Date;
  end: Date;
}

export interface SimpleReservation extends BaseReservation {
  user: BaseUser;
  room: BaseRoom;
}

export interface DetailedReservation extends BaseReservation {
  user: BaseUser;
  room: DetailedRoom;
}

// tslint:disable-next-line:no-empty-interface
export interface ReservationListLinks extends ListLinks {
}

export interface ReservationListEntity<T> extends RestListEntity<{ reservations: T[] }, ReservationListLinks> {
}


