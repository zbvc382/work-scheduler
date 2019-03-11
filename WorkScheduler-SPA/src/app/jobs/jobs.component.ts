import { Component, OnInit } from '@angular/core';
import { Day } from '../_models/Day';
import { SlotService } from '../_services/slot.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  days: Day[] = [];

  constructor(private slotService: SlotService) { }

  ngOnInit() {
    this.getDaysSlotsOfCurrentWeek();
  }

  getDaysSlotsOfCurrentWeek(value?: any) {

    if (value) {
      this.slotService.getWeekSlots(value.date).subscribe((days: Day[]) => {
        this.days = days;
      });
    } else {
      this.slotService.getWeekSlots(new Date()).subscribe((days: Day[]) => {
        this.days = days;
      });
    }
  }
}
