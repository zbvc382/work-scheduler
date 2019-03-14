import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Job } from '../_models/Job';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class JobService implements OnInit {
  baseUrl = environment.apiUrl + 'jobs';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { }

  getJobs(date: Date) {
    return this.httpClient.get<Job[]>(this.baseUrl + '/date/' + date);
  }
  createJob(job: Job) {
    return this.httpClient.post(this.baseUrl, job);
  }
  deleteJob(id: number) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }
  searchJobs(query: string, pageNumber?: string): Observable<PaginatedResult<Job[]>> {
    const paginatedResult: PaginatedResult<Job[]> = new PaginatedResult<Job[]>();

    let params = new HttpParams();

    if (pageNumber !== undefined) {
      params = params.append('query', query);
      params = params.append('pageNumber', pageNumber);
    } else {
      params = params.append('query', query);
    }

    return this.httpClient.get<Job[]>(this.baseUrl + '/search', {observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }
}
