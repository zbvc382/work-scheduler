import { Component, OnInit } from '@angular/core';
import { JobService } from '../_services/job.service';
import { Job } from '../_models/Job';
import { Slot } from '../_models/slot';
import { join } from 'path';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
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

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadJobs();
  }

  createSlots() {

  }

  loadJobs() {
    this.jobService.getJobs().subscribe(
      (jobs: Job[]) => {
        jobs.forEach(job => {
          job.timeFrom = new Date(job.timeFrom);
          job.timeTo = new Date(job.timeTo);

          if (job.slotReplaced === true) {
            this.slots[job.slotIndex].job = job;
          }

          if (job.slotReplaced === false) {
            const jobToInsert = job;
            this.slots.push({index: null, job: jobToInsert, defaultFrom: null, defaultTo: null});
          }
        });
        this.jobs = jobs;
      },
      error => {
        console.log('failed to load jobs');
      }
    );
  }
}
