import {Reservation} from './reservation.interface.model';

export class ReservationImpl implements Reservation {
  date: string;
  beginTime: string;
  roomCode: string;
  wingCode: string;
  owner: string;
  endTime: string;
  status: string;

  constructor(date: string, beginTime: string, roomCode: string, wingCode: string, owner: string, endTime: string, status: string) {
    this.date = date;
    this.beginTime = beginTime;
    this.roomCode = roomCode;
    this.wingCode = wingCode;
    this.owner = owner;
    this.endTime = endTime;
    this.status = status;
  }
}
