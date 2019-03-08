import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { BehaviorSubject} from 'rxjs';
import { Day } from '../_models/Day';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../_services/auth.service';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { JobDialogComponent } from '../job-dialog/job-dialog.component';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class CardComponent implements OnInit, OnDestroy {
  date = new FormControl(new Date());
  expanded: boolean[] = [false];
  days: Day[];
  private $data = new BehaviorSubject<Day[]>([]);
  payerTypes = ['Agency', 'Private', 'Landlord'];

  @Input() set data(value: Day[]) {
    this.$data.next(value);
  }

  get data() {
    return this.$data.getValue();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private dialog: MatDialog,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.$data.subscribe(j => {
      this.days = this.data;
    });
  }

  ngOnDestroy(): void {}

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

  addJob(data: Job, date: Date, index: number) {
    const job: Job = data;
    job.dateAssigned = date;

    if (index != null) {
      job.slotIndex = index;
      job.slotReplaced = true;
    } else {
      job.slotIndex = null;
      job.slotReplaced = false;
    }

    if (job.key === false) {
      job.keyAddress = null;
    }

    job.timeFrom = this.setTime(job.timeFrom, new Date(date));
    job.timeTo = this.setTime(job.timeTo, new Date(date));

    this.jobService.createJob(job).subscribe(error => {
      console.log(error);
    });
  }

  openDialog(date: Date, index: number, defaultFrom: Date) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.height = '600px';
    dialogConfig.width = '800px';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      payerTypes: this.payerTypes
    };

    console.log(defaultFrom);

    const dialogRef = this.dialog.open(JobDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.addJob(data, date, index);

      }
    });
  }

  timeConvert(time: string) {
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

  setTime(time: Date, date: Date) {
    const timeString = time.toString();
    const timeArray = this.timeConvert(timeString);
    const timeDate = date;
    timeDate.setHours(timeArray[0], timeArray[1], 0, 0);

    return timeDate;
  }

  // setTimeFrom(date: Date) {
  //   const timeString = this.job.timeFrom.toString();
  //   const timeArray = this.timeConvert(timeString);
  //   const timeDate = date;
  //   timeDate.setHours(timeArray[0], timeArray[1], 0, 0);

  //   this.job.timeFrom = timeDate;
  // }

  // setTimeTo(date: Date) {
  //   const timeString = this.job.timeTo.toString();
  //   const timeArray = this.timeConvert(timeString);
  //   const timeDate = date;
  //   timeDate.setHours(timeArray[0], timeArray[1], 0, 0);

  //   console.log(timeDate);
  //   this.job.timeTo = timeDate;
  // }
}
