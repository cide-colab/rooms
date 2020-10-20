import {Identity} from './identity';

export interface ReservationModel {
  title: string;
  description: string;
  start: string;
  end: string;
}

export interface Reservation extends ReservationModel, Identity {}
export interface RichReservation extends ReservationModel, Identity {}
