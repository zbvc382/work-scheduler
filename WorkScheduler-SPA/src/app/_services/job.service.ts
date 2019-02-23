import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../_models/Job';

@Injectable()
export class JobService implements OnInit {
  baseUrl = environment.apiUrl + 'jobs';
  constructor(private httpClinet: HttpClient) { }

  ngOnInit(): void {}

  getJobs(): Observable<Job[]> {
    return this.httpClinet.get<Job[]>(this.baseUrl);
  }
}
