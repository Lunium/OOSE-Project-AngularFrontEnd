import {Wing} from './wing.interface.model';

export class WingImpl implements Wing {
  wingCode: string;

  constructor(wingCode: string) {
    this.wingCode = wingCode;
  }
}
