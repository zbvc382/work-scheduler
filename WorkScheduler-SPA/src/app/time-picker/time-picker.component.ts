import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent implements OnInit, DoCheck {
  @Input() timeFrame: string;
  @Output() timeEmitter = new EventEmitter();
  time: any;
  animationState = 'inactive';
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#3f51b5'
    },
    dial: {
      dialBackgroundColor: '#3f51b5'
    },
    clockFace: {
      clockFaceInnerTimeInactiveColor: '#3f51b5',
      clockHandColor: '#3f51b5'
    }
  };

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.timeEmitter.emit(this.time);
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }
}
