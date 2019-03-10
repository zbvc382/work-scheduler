import { Injectable } from '@angular/core';
import { Day } from '../_models/Day';
import { Slot } from '../_models/Slot';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() {}

  private convert24Hour(time: string) {
    const splt = time.split(' ');
    const hoursAndMin = splt[0].split(':');
    const amPm = splt[1];
    let hours = Number(hoursAndMin[0]);
    const minutes = Number(hoursAndMin[1]);

    const finalDate = [];

    if (hours === 12 && amPm === 'am') {
      hours = 0;
    }

    if (hours >= 1 && hours <= 11 && amPm === 'pm') {
      hours = hours + 12;
    }

    finalDate[0] = hours;
    finalDate[1] = minutes;

    return finalDate;
  }

  get24HourTime(time: Date, date: Date) {
    const timeString = time.toString();
    const timeArray = this.convert24Hour(timeString);
    const timeDate = date;
    timeDate.setHours(timeArray[0], timeArray[1], 0, 0);

    return timeDate;
  }

  get12HourTime(time: Date): string {
    let UtcHours = time.getUTCHours().toString();
    let UtcMinutes = time.getUTCMinutes().toString();
    let UtcSeconds = time.getUTCSeconds().toString();

    if (Number(UtcHours) < 10) {
      UtcHours = '0' + UtcHours;
    }

    if (Number(UtcMinutes) < 10) {
      UtcMinutes = '0' + UtcMinutes;
    }

    if (Number(UtcSeconds) < 10) {
      UtcSeconds = '0' + UtcSeconds;
    }

    let UtcTime = UtcHours + ':' + UtcMinutes + ':' + UtcSeconds;

    const H = +UtcTime.substr(0, 2);
    const h = H % 12 || 12;
    const amPm = (H < 12 || H === 24) ? ' am' : ' pm';

    if (h < 10) {
      UtcTime = '0' + h + UtcTime.substr(2, 3) + amPm;
    } else {
      UtcTime = h + UtcTime.substr(2, 3) + amPm;
    }

    return UtcTime;
  }

  // public sortSlotsByDate(): void {

  //   array.sort((a: Slot, b: Slot) => {
  //       return a.defaultFrom.getTime() - b.defaultFrom.getTime();
  //   });
  // }
}
