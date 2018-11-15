import {Facility} from './facility.interface.model';

export class FacilityImpl implements Facility {
  facilityType: string;

  constructor(facilityType: string) {
    this.facilityType = facilityType;
  }

}
