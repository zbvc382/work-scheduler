import { Component, OnInit } from '@angular/core';
import { JobService } from '../_services/job.service';

import { formatDate, DatePipe } from '@angular/common';
import { Job } from '../_models/Job';
import { Slot } from '../_models/Slot';
import { DateFormat } from '../_pipes/date-format.pipe';
import { Week } from '../_models/Week';
import { Day } from '../_models/Day';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class JobsComponent implements OnInit {
  // date: Date;
  expanded: boolean[] = [false];
  jobs: Job[];
  days: Day[] = [];

  slots: Slot[] = [
    {
      index: 0,
      job: null,
      defaultFrom: new Date('2000-01-01T09:00:00'),
      defaultTo: new Date('2000-01-01T11:00:00')
    },
    {
      index: 1,
      job: null,
      defaultFrom: new Date('2000-01-01T11:00:00'),
      defaultTo: new Date('2000-01-01T13:00:00')
    },
    {
      index: 2,
      job: null,
      defaultFrom: new Date('2000-01-01T13:00:00'),
      defaultTo: new Date('2000-01-01T15:00:00')
    },
    {
      index: 3,
      job: null,
      defaultFrom: new Date('2000-01-01T15:00:00'),
      defaultTo: new Date('2000-01-01T17:00:00')
    }
  ];

  constructor(private jobService: JobService, private dateFormatPipe: DateFormat) {}

  ngOnInit() {
    this.loadJobs();
  }

  createSlots() {
    return true;
  }

  getSlot(): Slot[] {
    const slots: Slot[] = [
      {
        index: 0,
        job: null,
        defaultFrom: new Date('2000-01-01T09:00:00'),
        defaultTo: new Date('2000-01-01T11:00:00')
      },
      {
        index: 1,
        job: null,
        defaultFrom: new Date('2000-01-01T11:00:00'),
        defaultTo: new Date('2000-01-01T13:00:00')
      },
      {
        index: 2,
        job: null,
        defaultFrom: new Date('2000-01-01T13:00:00'),
        defaultTo: new Date('2000-01-01T15:00:00')
      },
      {
        index: 3,
        job: null,
        defaultFrom: new Date('2000-01-01T15:00:00'),
        defaultTo: new Date('2000-01-01T17:00:00')
      }
    ];
    return slots;
  }

  doSlots() {
    let end = 0;
    const tempDate = new Date();

    if (tempDate.getDay() === 7) {
      end = 10;
    } else {
      end = 8;
    }



    // let job: Job[];

    // job = this.jobs.filter(x => x.dateAssigned.getFullYear() === year
    // && x.dateAssigned.getMonth() === month
    // && x.dateAssigned.getDay() === day);

    // job.forEach(element => {
    //   console.log(element.id);
    // });

    for (let i = 0; i < 7; i++) {
      if (tempDate.getDay() === 7) {
        tempDate.setDate(tempDate.getDate() + 1);
        i--;
      } else {

        let jobs: Job[];
        tempDate.setDate(tempDate.getDate() + i);
        const tempSlots = this.getSlot();

        jobs = this.jobs.filter(x => x.dateAssigned.getFullYear() === tempDate.getFullYear()
        && x.dateAssigned.getMonth() === tempDate.getMonth()
        && x.dateAssigned.getDay() === tempDate.getDay());

        jobs.forEach(element => {
          if (element.slotReplaced === true) {
            tempSlots[element.slotIndex].job = element;
          }
          if (element.slotReplaced === false) {
            const jobToInsert = element;
            tempSlots.push({ index: null, job: jobToInsert, defaultFrom: null, defaultTo: null });
          }
        });
        this.days.push({date: tempDate, slots: tempSlots});
      }
    }
  }

  loadJobs() {
    const date = new Date();
    const dateFormated = this.dateFormatPipe.transform(date);

    this.jobService.getJobWeek(dateFormated).subscribe(
      (jobs: Job[]) => {
        jobs.forEach(job => {
          job.timeFrom = new Date(job.timeFrom);
          job.timeTo = new Date(job.timeTo);
          job.dateAssigned = new Date(job.dateAssigned);

          // if (job.slotReplaced === true) {
          //   this.slots[job.slotIndex].job = job;
          // }

          // if (job.slotReplaced === false) {
          //   const jobToInsert = job;
          //   this.slots.push({index: null, job: jobToInsert, defaultFrom: null, defaultTo: null});
          // }
        });
        this.jobs = jobs;
        this.doSlots();
      },
      error => {
        console.log('failed to load jobs');
      }
    );
  }
  onExpansion() {
    if (this.expanded[0] === false) {
      this.expanded[0] = true;
    } else {
      this.expanded[0] = false;
    }
  }
}
