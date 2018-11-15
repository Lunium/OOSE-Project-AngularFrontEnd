import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  filterStatus: boolean;
  date: string;
  beginTime: string;
  endTime: string;

  constructor() { }

}
