import {UserReservation} from './userreservation.interface.model';
import {ReservationImpl} from '../reservation/reservation.model';

export class UserReservationImpl extends ReservationImpl implements UserReservation {
  pinCode: number;

  constructor(date: string, beginTime: string, roomCode: string, wingCode: string, owner: string, endTime: string, status: string, pinCode: number) {
    super(date, beginTime, roomCode, wingCode, owner, endTime, status);
    this.pinCode = pinCode;
  }
}
