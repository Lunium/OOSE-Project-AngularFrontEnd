import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {Room} from '../../models/room/room.interface.model';
import {Reservation} from '../../models/reservation/reservation.interface.model';
import {Facility} from '../../models/facility/facility.interface.model';
import {Filter} from '../../models/filter/filter.interface.model';
import {UserReservation} from '../../models/userreservation/userreservation.interface.model';
import {Wing} from "../../models/wing/wing.interface.model";


@Injectable()
export class RestJsonService {

  constructor(private httpClient: HttpClient) { }

  patchUserReservation(url: string, roomCode: string, wingCode: string, date: string, beginTime: string): Promise<boolean> {

    const body = `{
      "roomCode" : "${roomCode}",
      "wingCode" : "${wingCode}",
      "date" : "${date}",
      "beginTime" : "${beginTime}"
    }`;

    const header = new HttpHeaders()
      .set('content-type', 'application/json');

    console.log(body);

    return this.httpClient.patch(url, body, {headers: header}).toPromise()
      .then( data => data)
      .catch(error => error);
  }

  getAllUserReservatons(url: string, user: string): Promise<UserReservation[]> {
    const params = new HttpParams()
      .set('owner', user);

    return this.httpClient.get<UserReservation>(url, {params: params}).toPromise()
      .then(data => data)
      .catch( error => error);
  }

  getAllReservations(url: string): Promise<Room[]> {
    return this.httpClient.get<Room>(url).toPromise()
      .then(data => data)
      .catch(error => error);
  }

  postReservation(url: string, reservation: Reservation): Promise<Reservation> {
    return this.httpClient.post(url, reservation).toPromise()
      .then(data => data)
      .catch(error => error);
  }

  getFacilities(url: string): Promise<Facility[]> {
    return this.httpClient.get<Facility>(url).toPromise()
      .then(data => data)
      .catch(error => error);
  }

  getWings(url: string): Promise<Wing[]> {
    return this.httpClient.get<Wing>(url).toPromise()
      .then(data => data)
      .catch(error => error);
  }

  postFilterReservation(url: string, filter: Filter): Promise<Room[]> {
    console.log(filter);
    return this.httpClient.post<Room>(url, filter).toPromise()
      .then(data => data)
      .catch(error => error);
  }

  getWeek(weekNumber: string, yearNumber: string, roomCode: string, wingCode: string): Promise<Room[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('weeknumber', weekNumber)
      .set('year', yearNumber)
      .set('roomcode', roomCode)
      .set('wingcode', wingCode);

    return this.httpClient.get<Room>('http://localhost:8080/reservation/getroomreservationsbyweek', {
      headers: headers,
      params: params
    }).toPromise()
      .then(data => data)
      .catch(error => error);
  }

  getRoomInfo(url: string, wingCode: string, roomCode: string): Promise<Room> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('roomCode', roomCode)
      .set('wingCode', wingCode);

    return this.httpClient.get<Room>(url, {
      headers: headers,
      params: params
    }).toPromise()
      .then(data => data)
      .catch(error => error);
  }
}
