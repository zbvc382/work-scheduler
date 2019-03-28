import { Component, OnInit } from '@angular/core';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SlotService } from '../_services/slot.service';
import { Day } from '../_models/Day';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {
  days: Day[];
  today: Date;

  constructor(private slotService: SlotService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.today = new Date();
    this.slotService.getWeekSlots(new Date()).subscribe((days: Day[]) => {
      this.days = days;
      this.removeSunday();
    });
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }

  removeSunday() {
    this.days.forEach(element => {
      console.log(element.date.getDay());
      if (element.date.getDay() === 0) {
        this.days.splice(element.id, 1);
      }
    });
  }

  isToday(date: Date): boolean {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds());

    if ((newDate.getDate() === this.today.getDate()) && (newDate.getDay() === this.today.getDay())) {
      return true;
    }

    return false;
  }
}
