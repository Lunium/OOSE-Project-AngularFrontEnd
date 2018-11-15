import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestJsonService} from '../../services/restcallback/restjsonarrayservice.service';
import {Filter} from '../../models/filter/filter.interface.model';
import {FilterImpl} from '../../models/filter/filter.model';
import {Room} from '../../models/room/room.interface.model';
import {DatePipe} from '@angular/common';
import {DataService} from "../../services/dataservice/dataservice.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public facilities = [];
  public wings = [];
  public error;
  public filterStatus: boolean;

  public date: string;
  public endTime: string;
  public beginTime: string;
  public capacity: number;
  public wingCode: string;
  public checkfacilities = [];

  public filter: Filter;
  @Output() onFilterChanged = new EventEmitter();

  constructor(private service: RestJsonService, private datepipe: DatePipe, private dataService: DataService) { }


  ngOnInit() {
    this.filterStatus = false;
    this.service.getFacilities('http://localhost:8080/room/facilities')
      .then(data => {
        this.facilities = data;
      })
      .catch(error => {
        this.error = error;
      });
    this.service.getWings('http://localhost:8080/room/wings')
      .then(data => {
        this.wings = data;
      })
      .catch(error => {
        this.error = error;
      });
  }

  ngOnDestroy() {
    this.dataService.filterStatus = this.filterStatus;
    this.dataService.date = this.date;
    this.dataService.beginTime = this.beginTime;
    this.dataService.endTime = this.endTime;
  }

  public onOk(): void {
    const defaults = this.setUndefinedDefault();
    this.filterRooms();
    this.removeDefaults(defaults);
  }

  public onReset(): void {
    this.resetFilter();
    this.filterRooms();
    this.removeDefaults([true, true, true, true, true]);
  }

  public filterRooms(): void {
    this.filter = new FilterImpl(this.date, this.endTime + ':00', this.beginTime + ':00', this.capacity,
      this.wingCode, this.convertCheckFacilities(this.checkfacilities));
    this.service.postFilterReservation('http://localhost:8080/filter/apply', this.filter)
      .then(data => {
        this.onFilterChanged.emit(data);
      })
      .catch(error => {
        this.error = error;
      });
  }

  public setUndefinedDefault(): boolean[] {
    const returnBool = [];
    if (!this.date) {
      this.filterStatus = false;
    } else {
      this.filterStatus = true;
    }
    if (!this.date) {
      this.date = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
      returnBool[0] = true;
    }
    if (!this.beginTime) {
      this.beginTime = '00:00';
      returnBool[1] = true;
    }
    if (!this.endTime) {
      this.endTime = '00:00';
      returnBool[2] = true;
    }
    if (!this.capacity) {
      this.capacity = 0;
      returnBool[3] = true;
    }
    if (!this.wingCode) {
      this.wingCode = null;
      returnBool[4] = true;
    }
    return returnBool;
  }

  public convertCheckFacilities(checkfacilities: boolean[]): string[] {
    const newfacilities: string[] = ['init'];
    let count = 0;

    for (let i = 0; i < checkfacilities.length; i++) {
      if (checkfacilities[i] === true) {
        newfacilities[count] = this.facilities[i].facilityType;
        count++;
      }
    }
    if (newfacilities[0] === 'init') {
      return null;
    }
    return newfacilities;
  }

  public resetFilter(): void {
    this.date = this.datepipe.transform(new Date().toString(), 'yyyy-MM-dd');
    this.beginTime = '00:00';
    this.endTime = '00:00';
    this.capacity = 0;
    this.wingCode = null;
    this.checkfacilities = [];
    this.filterStatus = false;
  }

  public removeDefaults(defaults: boolean[]): void {
    if (defaults[0] === true) {
      this.date = null;
    }
    if (defaults[1] === true) {
      this.beginTime = null;
    }
    if (defaults[2] === true) {
      this.endTime = null;
    }
    if (defaults[3] === true) {
      this.capacity = null;
    }
    if (defaults[4] === true) {
      this.wingCode = null;
    }
  }

}
