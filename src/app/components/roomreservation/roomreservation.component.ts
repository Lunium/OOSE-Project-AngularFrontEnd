import {Component, OnInit} from '@angular/core';
import {RestJsonService} from '../../services/restcallback/restjsonarrayservice.service';
import {DatePipe} from '@angular/common';
import {RoomTimeSlot} from '../reservations/interface/room-time-slot.interface';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/dataservice/dataservice.service';
import {ReservationImpl} from "../../models/reservation/reservation.model";
import { ChangeDetectorRef } from '@angular/core';
import {DayInterface} from "../reservations/interface/day.interface";
import {TimeslottableService} from "../../services/timeslottableservice/timeslottable.service";

@Component({
  selector: 'app-roomreservation',
  templateUrl: './roomreservation.component.html',
  styleUrls: ['./roomreservation.component.css']
})
export class RoomreservationComponent implements OnInit {
  data;
  error;

  roomOverviewData;
  week;
  year;

  roomCode;
  wingCode;
  filterStatus;
  roomInfo;

  date;
  endTime  = null;
  beginTime = null;

  timeSlots = [];
  days = [];
  checkBoxBool = false;
  checkBoxCounter = 0;
  chosenDateName = null;

  private sub: any;

  constructor(private service: RestJsonService,
              private datepipe: DatePipe,
              private route: ActivatedRoute,
              private dataService: DataService,
              private tableService: TimeslottableService) {
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getData(): void {
    this.sub = this.route.params.subscribe(params => {
      this.roomCode = params['roomCode'];
      this.wingCode = params['wingCode'];
    });

    this.filterStatus = this.dataService.filterStatus;
    this.date = this.dataService.date;
    this.beginTime = this.dataService.beginTime;
    this.endTime = this.dataService.endTime;

    if (this.date === undefined) {
      this.date = Date.now();
    }

    this.week = this.tableService.getWeek(this.date);
    this.year = this.tableService.getYear(this.date);

    this.service.getWeek(this.week, this.year, this.roomCode, this.wingCode)
      .then(data => {
        this.roomOverviewData = data;
        this.tableService.setOverviewRoomReservations(this, this.roomOverviewData, this.date);
        this.service.getRoomInfo('http://localhost:8080/room', this.wingCode, this.roomCode)
          .then(data => {
            this.roomInfo = data;
          });
      });
  }

  onPlaceReservation(): void {
    const reservation = new ReservationImpl(this.date, this.beginTime + ':00', this.roomCode, this.wingCode,
      sessionStorage.getItem('sessionEmail'), this.endTime + ':00', 'Gereserveerd');
    this.service.postReservation('http://localhost:8080/reservation/add', reservation)
      .then(data => {
        this.data = data;
        window.location.reload();
      })
      .catch(error => {
        this.error = error;
      });
  }


  onCheckboxClicked (clickDirection: boolean, dateName: string, date: string, reservation: RoomTimeSlot, day: DayInterface) {
    const reservationTime = ((reservation.hour < 10) ? '0' + reservation.hour : reservation.hour) + ':' + ((reservation.minute === 0) ? '00' : reservation.minute);

    this.updateCounter(clickDirection);

    this.updateTableContent(day, reservation);

    this.updateTimes(dateName, date, reservationTime, clickDirection);

    this.updateCheckboxBool();
  }

  addMinutesToTime(time: string, add: number): string {
    const a = time.split(':');
    const d = new Date();
    d.setHours(+a[0]);
    d.setMinutes(+a[1] + add);
    return this.datepipe.transform(d, 'HH:mm');
  }

  updateCounter(clickDirection: boolean): void {
    if (clickDirection === true) {
      this.checkBoxCounter++;
    } else {
      this.checkBoxCounter--;
    }
  }

  updateCheckboxBool(): void{
    if (this.checkBoxCounter > 1) {
      this.checkBoxBool = true;
    } else {
      this.checkBoxBool = false;
    }
  }

  findDayIndex(day: DayInterface): number {
    for (let i = 0; i < this.days.length; i++) {
      if (this.days[i] === day) {
        return i;
      }
    }
  }

  updateTableContent(day: DayInterface, reservation: RoomTimeSlot): void {
    let hasCheckPassed = false;
    let hasBeenReserved = false;
    const dayIndex = this.findDayIndex(day);

    for ( let i = 0; i < day.roomTimeSlots.length; i++ ) {
      if (this.checkBoxCounter === 0) {
        this.days[dayIndex].roomTimeSlots[i].shouldDraw = true;
        continue;
      }

      if (!hasCheckPassed) {
        if (day.roomTimeSlots[i] === reservation && this.checkBoxCounter === 2 || day.roomTimeSlots[i].checkBoxValue) {
          hasCheckPassed = true;
          continue;
        }
        this.days[dayIndex].roomTimeSlots[i].shouldDraw = false;
        continue;
      }

      if (day.roomTimeSlots[i].reserved) {
        hasBeenReserved = true;
      }

      if (hasBeenReserved) {
        this.days[dayIndex].roomTimeSlots[i].shouldDraw = false;
      }
    }
  }

  updateTimes(dateName: string, date: string, reservationTime: string, clickDirection: boolean): void {
    if (this.checkBoxCounter > 0) {
      this.chosenDateName = dateName;
      this.date = date;
      const prevEndTime = this.endTime;

      if (this.beginTime === null || typeof this.beginTime === 'undefined') {
        this.beginTime = reservationTime;
        this.endTime = reservationTime;
      } else {
        if (this.beginTime > reservationTime) {
          this.endTime = this.beginTime;
          this.beginTime = reservationTime;
        } else {
          this.endTime = reservationTime;
        }
      }

      if (this.checkBoxCounter === 1 && clickDirection === false) {
        if (reservationTime === this.addMinutesToTime(prevEndTime, -15)) {
          this.endTime = this.beginTime;
        } else {
          this.beginTime = this.addMinutesToTime(prevEndTime, -15);
          this.endTime = this.addMinutesToTime(prevEndTime, -15);
        }
      }

      this.endTime = this.addMinutesToTime(this.endTime, 15);
    } else {
      this.chosenDateName = null;
      this.date = null;
      this.beginTime = null;
      this.endTime = null;
    }
  }
}
