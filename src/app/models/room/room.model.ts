import {Room} from './room.interface.model';
import {Reservation} from '../reservation/reservation.interface.model';
import {Facility} from '../facility/facility.interface.model';

export class RoomImpl implements Room {
  roomCode: string;
  wingCode: string;
  capacity: number;
  facilities: Facility[];
  roomReservations: Reservation[];

  constructor(roomCode: string, wingCode: string, capacity: number, facilities: Facility[], roomReservations: Reservation[]) {
    this.roomCode = roomCode;
    this.wingCode = wingCode;
    this.capacity = capacity;
    this.facilities = facilities;
    this.roomReservations = roomReservations;
  }
}
