import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../_models/Job';

@Injectable()
export class JobService implements OnInit {
  baseUrl = environment.apiUrl + 'jobs';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { }

  getJobs(date: Date) {
    return this.httpClient.get<Job[]>(this.baseUrl + '/date/' + date);
  }
}
