import { Component, OnInit } from '@angular/core';
import { JobService } from '../_services/job.service';
import { Job } from '../_models/Job';
import { Slot } from '../_models/slot';

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
      filled: false,
      defaultTimeFrom: new Date('2000-01-01T09:00:00'),
      defaultTimeTo: new Date('2000-01-01T11:00:00')
    },
    {
      index: 1,
      job: null,
      filled: false,
      defaultTimeFrom: new Date('2000-01-01T11:00:00'),
      defaultTimeTo: new Date('2000-01-01T13:00:00')
    },
    {
      index: 2,
      job: null,
      filled: false,
      defaultTimeFrom: new Date('2000-01-01T13:00:00'),
      defaultTimeTo: new Date('2000-01-01T15:00:00')
    },
    {
      index: 3,
      job: null,
      filled: false,
      defaultTimeFrom: new Date('2000-01-01T15:00:00'),
      defaultTimeTo: new Date('2000-01-01T17:00:00')
    }
  ];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadJobs();
  }

  setSlots() {
    this.jobs.forEach(job => {
      this.slots.forEach(slot => {
        if (
          !slot.filled &&
          (slot.defaultTimeFrom.getHours() === job.timeFrom.getHours()) &&
          (slot.defaultTimeTo.getHours() === job.timeTo.getHours())
        ) {
          this.slots[slot.index].job = job;
          this.slots[slot.index].filled = true;
        }
      });
    });
  }

  loadJobs() {
    this.jobService.getJobs().subscribe(
      (jobs: Job[]) => {
        jobs.forEach(element => {
          element.timeFrom = new Date(element.timeFrom);
          element.timeTo = new Date(element.timeTo);
        });
        this.jobs = jobs;
      },
      error => {
        console.log('failed to load jobs');
      }
    );
  }
}
