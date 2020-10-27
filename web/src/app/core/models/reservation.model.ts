import {Identity} from './identity';
import {Room} from './room.model';
import {User} from './user.model';
import {Abo} from './abo.model';

export interface ReservationModel {
  title: string;
  description: string;
  start: string;
  end: string;
}

export interface Reservation extends ReservationModel, Identity {}

export interface RichReservation extends ReservationModel, Identity {
  room: Room;
  user: User;
  abo: Abo;
}
