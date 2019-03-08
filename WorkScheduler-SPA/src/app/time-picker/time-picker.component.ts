import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { TimeService } from '../_services/time.service';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent implements OnInit, DoCheck {
  @Input() timeFrame: string;
  @Output() timeEmitter = new EventEmitter();
  @Input() time: any;
  // @Input() replaced = false;
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
