import { Injectable } from '@angular/core';

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
    let LocalHours = time.getHours().toString();
    let LocalMinutes = time.getMinutes().toString();
    let LocalSeconds = time.getSeconds().toString();

    if (Number(LocalHours) < 10) {
      LocalHours = '0' + LocalHours;
    }

    if (Number(LocalMinutes) < 10) {
      LocalMinutes = '0' + LocalMinutes;
    }

    if (Number(LocalSeconds) < 10) {
      LocalSeconds = '0' + LocalSeconds;
    }

    let LocalTime = LocalHours + ':' + LocalMinutes + ':' + LocalSeconds;

    const H = +LocalTime.substr(0, 2);
    const h = H % 12 || 12;
    const amPm = H < 12 || H === 24 ? ' am' : ' pm';

    if (h < 10) {
      LocalTime = '0' + h + LocalTime.substr(2, 3) + amPm;
    } else {
      LocalTime = h + LocalTime.substr(2, 3) + amPm;
    }

    return LocalTime;
  }
}
