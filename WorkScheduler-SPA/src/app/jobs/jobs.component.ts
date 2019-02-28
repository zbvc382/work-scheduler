import { Component, OnInit } from '@angular/core';
import { Day } from '../_models/Day';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SlotService } from '../_services/slot.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class JobsComponent implements OnInit {
  days: Day[] = [];


  constructor(private slotService: SlotService) { }

  ngOnInit() {
    this.days = this.slotService.getWeekSlots(new Date());
    this.slotService.clearWeekSlots();
  }
}
