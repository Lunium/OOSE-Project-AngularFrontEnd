import {Reservation} from '../reservation/reservation.interface.model';

export interface UserReservation extends Reservation {
  pinCode: number;
}
