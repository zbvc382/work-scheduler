import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { Day } from '../_models/Day';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CardComponent implements OnInit, OnDestroy {
  date = new FormControl(new Date());
  expanded: boolean[] = [false];
  days: Day[];
  private $data = new BehaviorSubject<Day[]>([]);

  @Input() set data(value: Day[]) {
    this.$data.next(value);
  }

  get data() {
    return this.$data.getValue();
  }

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.$data.subscribe(j => {
      this.days = this.data;
    });
    console.log('on init');
  }

  ngOnDestroy(): void {
    console.log('on destroy');
  }

  onExpansion() {
    if (this.expanded[0] === false) {
      this.expanded[0] = true;
    } else {
      this.expanded[0] = false;
    }
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }
}
