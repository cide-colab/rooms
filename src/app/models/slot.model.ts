import {Links, RestListEntity} from './rest-entity.model';


export interface SlotLinks extends Links {
}


export interface BaseSlot {
  start: Date;
  end: Date;
  minutes: number;
}

export interface SlotListEntity<T> extends RestListEntity<{ slots: T[] }, SlotLinks> {
}
