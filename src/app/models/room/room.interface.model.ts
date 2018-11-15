import {Reservation} from '../reservation/reservation.interface.model';
import {Facility} from '../facility/facility.interface.model';

export interface Room {
  roomCode: string;
  wingCode: string;
  capacity: number;
  facilities: Facility[];
  roomReservations: Reservation[];
}
