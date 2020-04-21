import {BaseRoom} from './room.model';
import {AboLinks, BaseAbo} from './abo.model';
import {Links, RestEntity, RestListEntity} from './rest-entity.model';

export interface ContingentLinks extends Links {
}

export interface BaseContingent extends RestEntity<AboLinks> {
  used: number;
  left: number;
}

export interface ContingentListEntity<T> extends RestListEntity<{ contingents: T[] }, ContingentLinks> {
}
