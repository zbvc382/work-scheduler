import { Component, OnInit } from '@angular/core';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  jobs: Job[];
  expanded: boolean[] = [false];

  constructor(private jobsService: JobService) { }

  ngOnInit() {
  }

 onExpansion() {
   if (this.expanded[0] === false) {
     this.expanded[0] = true;
   } else {
     this.expanded[0] = false;
   }
 }

  loadJobs() {
    this.jobsService.getJobs().subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    }, error => {
      console.log('failed to load jobs');
    });
  }
}
