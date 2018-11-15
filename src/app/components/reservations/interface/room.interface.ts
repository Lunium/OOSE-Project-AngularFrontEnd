import {RoomTimeSlot} from "./room-time-slot.interface";

export interface RoomInterface {
  room: string;
  roomTimeSlots: RoomTimeSlot[];
}
