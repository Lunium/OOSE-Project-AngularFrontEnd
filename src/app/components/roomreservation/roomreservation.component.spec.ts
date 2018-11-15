import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {RoomreservationComponent} from './roomreservation.component';

describe('RoomreservationComponent', () => {
  let component: RoomreservationComponent;
  let fixture: ComponentFixture<RoomreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomreservationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format the date correctly', () => {
    const date = '2018-01-01';
    const weekday = component.getDateFormatted('Weekday', date);
    const year = component.getDateFormatted('Year', date);
    const week = component.getDateFormatted('Week', date);
    const ymd = component.getDateFormatted('YMD', date);

    expect(weekday).toBe('Monday');
    expect(year).toBe('2018');
    expect(week).toBe('1');
    expect(ymd).toBe('2018-01-01');
  });

  // it('should give a date object of the first day of 2018', () => {
  //   const ISOdate = component.getDateOfISOWeek(1, 2018, 1);
  //   const date = new Date();
  //   date.setDate(2018, 1, 1);
  //
  // });

  it('should call setOverviewRoomReservations', () => {
    spyOn(component, 'setOverviewRoomReservations');
    expect(component.setOverviewRoomReservations()).toHaveBeenCalled();
  });
});
