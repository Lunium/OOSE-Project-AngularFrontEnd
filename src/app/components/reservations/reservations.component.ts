import {Component, OnInit} from '@angular/core';
import {RestJsonService} from '../../services/restcallback/restjsonarrayservice.service';
import {Room} from '../../models/room/room.interface.model';
import {RoomTimeSlot} from './interface/room-time-slot.interface';
import {DataService} from "../../services/dataservice/dataservice.service";
import {TimeslottableService} from "../../services/timeslottableservice/timeslottable.service";


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  error: string;
  timeSlots = [];
  roomOverviewData;
  rooms = [];

  constructor(private service: RestJsonService,
              private tableservice: TimeslottableService) {  }

  ngOnInit() {
    this.service.getAllReservations('http://localhost:8080/reservation/reservations')
      .then(data => {
        this.roomOverviewData = data;
        this.tableservice.setOverviewReservations(this, this.roomOverviewData);
      })
      .catch(error => {
        console.log(error);
        this.error = error;
      });
  }

  onFilterChanged(filteredrooms: Room[]): void {
    this.roomOverviewData = filteredrooms;
    this.refreshRooms();
  }

  refreshRooms(): void {
    this.timeSlots = [];
    this.rooms = [];
    this.tableservice.setOverviewReservations(this, this.roomOverviewData);
  }
}
