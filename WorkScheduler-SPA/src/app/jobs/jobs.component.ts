import { Component, OnInit } from '@angular/core';
import { JobService } from '../_services/job.service';
import { Job } from '../_models/Job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  slots: any [] = [];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    }, error => {
      console.log('failed to load jobs');
    });
  }

}
