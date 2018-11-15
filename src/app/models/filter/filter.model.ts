import {Filter} from './filter.interface.model';

export class FilterImpl implements Filter {
  date: string;
  endTime: string;
  beginTime: string;
  capacity: number;
  wingCode: string;
  facilities: string[];

constructor(date: string, endTime: string, beginTime: string, capacity: number, wingCode: string, facilities: string[]) {
    this.date = date;
    this.endTime = endTime;
    this.beginTime = beginTime;
    this.capacity = capacity;
    this.wingCode = wingCode;
    this.facilities = facilities;
  }
}
