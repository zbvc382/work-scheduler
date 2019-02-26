import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { Slot } from '../_models/slot';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CardComponent implements OnInit {
  expanded: boolean[] = [false];
  slots: Slot[];
  private $data = new BehaviorSubject<Slot[]>([]);

  @Input() set data(value: Slot[]) {
    this.$data.next(value);
  }

  get data() {
    return this.$data.getValue();
  }

  constructor() { }

  ngOnInit() {
    this.$data.subscribe(j => {
      this.slots = this.data;
    });
  }

 onExpansion() {
   if (this.expanded[0] === false) {
     this.expanded[0] = true;
   } else {
     this.expanded[0] = false;
   }
 }
}
