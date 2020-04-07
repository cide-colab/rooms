import {BaseRoom} from './room.model';
import {BaseAbo} from './abo.model';
import {Links, RestListEntity} from './rest-entity.model';

export interface ContingentLinks extends Links {
}

export interface BaseContingent {
  rooms: BaseRoom[];
  abo: BaseAbo;
  used: number;
  left: number;
}

export interface ContingentListEntity<T> extends RestListEntity<{ contingents: T[] }, ContingentLinks> {
}
