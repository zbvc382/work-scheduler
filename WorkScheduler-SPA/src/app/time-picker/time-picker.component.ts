import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
//   animations: [
//     trigger('slideToggle', [
//         state('inactive', style({height: 0})),
//         state('active', style({height: '*'})),
//         transition('inactive <=> active', [
//             animate(300)
//         ])
//     ])
// ]
})
export class TimePickerComponent implements OnInit, DoCheck {
  @Input() timeFrame: string;
  @Output() timeEmitter = new EventEmitter();
  time: any;
  animationState = 'inactive';

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.timeEmitter.emit(this.time);
  }

  // onEvent(value: any) {
  //   this.timeValue.emit(value);
  // }

//   toggleAnimState(): void {
//     this.animationState = this.animationState === 'inactive' ? 'active' : 'inactive';
// }
}
