import {Link, Links, ListLinks, RestEntity, RestListEntity} from './rest-entity.model';
import {BaseEntity} from './base-entity.model';
import {BaseUser} from './user.model';
import {BaseRoom, DetailedRoom} from './room.model';
import {SimpleReservation} from './reservation.model';

export interface AboLinks extends Links {
  rooms: Link;
  user: Link;
}

export interface BaseAbo extends RestEntity<AboLinks>, BaseEntity {
  start: Date;
  end: Date;
  contingent: number;
  unlimited_end: boolean;
  unlimited_contingent: boolean;
  title: string;
  description?: string;
}

export interface SimpleAbo extends BaseAbo {
  user: BaseUser;
  rooms: BaseRoom[];
}

export interface DetailedAbo extends BaseAbo {
  user: BaseUser;
  rooms: DetailedRoom[];
  reservations: SimpleReservation[];
}

// tslint:disable-next-line:no-empty-interface
export interface AboListLinks extends ListLinks {
}

export interface AboListEntity<T> extends RestListEntity<{ abos: T[] }, AboListLinks> {
}
