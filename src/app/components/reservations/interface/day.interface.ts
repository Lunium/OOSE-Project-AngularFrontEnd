import {RoomTimeSlot} from "./room-time-slot.interface";

export interface DayInterface {
  date: string;
  dateName: string;
  roomTimeSlots: RoomTimeSlot[];
}
