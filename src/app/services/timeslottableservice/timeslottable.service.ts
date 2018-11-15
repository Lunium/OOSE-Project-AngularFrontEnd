import { Injectable} from '@angular/core';
import {RoomTimeSlot} from "../../components/reservations/interface/room-time-slot.interface";
import {DatePipe} from "@angular/common";

@Injectable()
export class TimeslottableService {

  dateDay;

  constructor(private datepipe: DatePipe) { }

  setOverviewReservations(superClass, roomOverviewData): void {
    this.resetTimeSlots(superClass);

    for (let i = 0; i < roomOverviewData.length; i++) {
      const roomDataRoom = roomOverviewData[i];
      const roomTimeSlot = [];

      this.addTimeSlot(roomDataRoom, roomTimeSlot, null, null);

      superClass.rooms.push({
        room: `${roomDataRoom.wingCode} - ${roomDataRoom.roomCode}`, roomTimeSlots: roomTimeSlot,
        routerPath: roomDataRoom.wingCode + '/' + roomDataRoom.roomCode
      });
    }
  }

  setOverviewRoomReservations(superClass, roomOverviewData, date): void {
    this.resetTimeSlots(superClass);

    const schooldaysInWeek = 5;

    const week = this.getWeek(date);
    const year = this.getYear(date);

    for (let day = 0; day < schooldaysInWeek; day++) {
      const roomTimeSlot = [];

      const dateDay = this.datepipe.transform(this.getDateOfISOWeek(week, year, day), 'yyyy-MM-dd');
      const dateName = this.setDateName(day);

      this.addTimeSlot(roomOverviewData, roomTimeSlot, dateDay, day);

      superClass.days.push({date: this.dateDay, roomTimeSlots: roomTimeSlot, dateName: dateName});
    }
  }

  getDateFormatted(type: string, input: string): string {
    let format;
    switch (type) {
      case('Weekday'):
        format = 'EEEE';
        break;
      case('Year'):
        format = 'y';
        break;
      case('Week'):
        format = 'w';
        break;
      case('YMD'):
        format = 'yyyy-MM-dd';
        break;
      case('HMM'):
        format = 'h:mm';
        break;
    }
    return this.datepipe.transform(input, format);
  }

  compareTime(time1: string, time2: string): number {
    const t1 = new Date();
    let parts = time1.split(':');
    t1.setHours(+parts[0], +parts[1]);

    const t2 = new Date();
    parts = time2.split(':');
    t2.setHours(+parts[0], +parts[1]);

    if (t1.getTime() > t2.getTime()) {
      return 1;
    } else if (t1.getTime() < t2.getTime()) {
      return -1;
    } else {
      return 0;
    }
  }

  getWeek(date): string {
    const currentDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    return this.getDateFormatted('Week', currentDate);
  }

  getYear(date): string {
    const currentDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    return this.getDateFormatted('Year', currentDate);
  }

  resetTimeSlots(superClass): void {
    for (let hour = 8; hour < 22; hour++) {
      superClass.timeSlots.push(hour);
    }
  }

  setDateName(day): string {
    switch (day) {
      case(0):
        return 'Maandag';
      case(1):
        return 'Dinsdag';
      case(2):
        return 'Woensdag';
      case(3):
        return 'Donderdag';
      case(4):
        return 'Vrijdag';
    }
  }

  addTimeSlot(roomOverviewData, roomTimeSlot, dateDay, day): void {
    for (let hour = 8; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeSlot = this.newTimeSlot(hour, minute);
        timeSlot.color = this.setColor(timeSlot.hour);

         if (dateDay === null && day === null) {
           if (roomOverviewData.roomReservations.length > 0) {
             this.updateTimeSlotValues(roomOverviewData, null, null, hour, minute, timeSlot);
           }
         } else {
            if (roomOverviewData.length > 0) {
              this.updateTimeSlotValues(roomOverviewData, dateDay, day, hour, minute, timeSlot);
            }
         }

        roomTimeSlot.push(timeSlot);
      }
    }
  }

  newTimeSlot(hour, minute): RoomTimeSlot {
    const timeSlot: RoomTimeSlot = {
      hour: hour,
      minute: minute,
      reserved: false,
      color: '',
      resNumber: '',
      checkBoxValue: false,
      shouldDraw: true
    };

    return timeSlot;
  }

  setColor(hour): string {
    let color = '#e6e6e6';

    if (hour % 2 === 0) {
      color = '#f1f1f1';
    }

    return color;
  }

  updateTimeSlotValues(roomOverviewData, dateDay, day, hour, minute, timeSlot): void {
    const length = this.getCorrespondingLength(roomOverviewData, dateDay, day);

    for (let i = 0; i < length; i++) {
      const res = this.getCorrespondingRes(roomOverviewData, dateDay, day, i);

      if (this.compareTime(`${hour}:${minute}:00`, res.beginTime) >= 0
        && this.compareTime(`${hour}:${minute}:00`, res.endTime) < 0) {
        if (day != null && dateDay != null) {
          this.setDateDay(res, dateDay, day, i, timeSlot);
        } else {
          timeSlot.reserved = true;
          timeSlot.color = '#f64e43';
          timeSlot.resNumber = '' + (i + 1);
        }
      }
    }
  }

  getCorrespondingRes(roomOverviewData, dateDay, day, i): any {
    if (dateDay != null && day != null) {
      return roomOverviewData[i];
    } else {
      return roomOverviewData.roomReservations[i];
    }
  }

  getCorrespondingLength(roomOverviewData, dateDay, day): any {
    if (dateDay != null && day != null) {
      return roomOverviewData.length;
    } else {
      return roomOverviewData.roomReservations.length;
    }
  }

  setDateDay(res, dateDay, day, i, timeSlot): void {
    const dayInRes = this.getDateFormatted('Weekday', res.date);

    let dayName = '';
    switch (day) {
      case(0):
        dayName = 'Monday';
        break;
      case(1):
        dayName = 'Tuesday';
        break;
      case(2):
        dayName = 'Wednesday';
        break;
      case(3):
        dayName = 'Thursday';
        break;
      case(4):
        dayName = 'Friday';
        break;
    }

    if (dayInRes === dayName) {
      this.dateDay = res.date;
      timeSlot.reserved = true;
      timeSlot.color = '#f64e43';
      timeSlot.resNumber = '' + (i + 1);
    } else {
      this.dateDay = dateDay;
    }
  }

  getDateOfISOWeek(week, year, day): Date {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) {
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    ISOweekStart.setDate(ISOweekStart.getDate() + day);
    return ISOweekStart;
  }
}
