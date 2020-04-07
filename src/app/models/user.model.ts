import {Link, Links, ListLinks, RestEntity, RestListEntity} from './rest-entity.model';
import {BaseEntity} from './base-entity.model';

export interface SessionUser {
  principal: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl: string;
}

export interface UserLinks extends Links {
  user: Link;
  roles: Link;
  reservations: Link;
  abos: Link;
}

export interface BaseUser extends RestEntity<UserLinks>, BaseEntity {
  principal: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl: string;
}

export interface SimpleUser extends BaseUser {

}

export interface DetailedUser extends BaseUser {

}

// tslint:disable-next-line:no-empty-interface
export interface UserListLinks extends ListLinks {
}

export interface UserListEntity<T> extends RestListEntity<{ users: T[] }, UserListLinks> {
}
