import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Job } from '../_models/Job';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DateRange } from '../_enums/DateRange.enum';
import { JobToCreate } from '../_models/JobToCreate';
import { ExtraJob } from '../_models/ExtraJob';

@Injectable()
export class JobService implements OnInit {
  baseUrl = environment.apiUrl + 'jobs';
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  getJobs(date: Date) {
    return this.httpClient.get<Job[]>(this.baseUrl + '/date/' + date);
  }
  createJob(job: JobToCreate) {
    return this.httpClient.post(this.baseUrl, job);
  }

  createExtraJob(job: JobToCreate, id: number) {
    return this.httpClient.post(this.baseUrl + '/' + id, job);
  }
  deleteJob(id: number) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }

  updateJob(updateObject: any) {
    return this.httpClient.put(this.baseUrl, updateObject);
  }

  getJobByJobNumber(jobNumber: string) {
    return this.httpClient.get<ExtraJob>(this.baseUrl + '/number/' + jobNumber);
  }

  searchJobs(
    query: string,
    pageNumber?: string,
    dateRange?: string,
    jobNumber?: string
  ): Observable<PaginatedResult<Job[]>> {
    const paginatedResult: PaginatedResult<Job[]> = new PaginatedResult<
      Job[]
    >();

    let params = new HttpParams();

    if (pageNumber !== undefined && dateRange !== undefined) {
      params = params.append('query', query);
      params = params.append('pageNumber', pageNumber);
      params = params.append('dateFrom', this.getDateRange(dateRange));
    } else if (dateRange !== undefined) {
      params = params.append('query', query);
      params = params.append('dateFrom', this.getDateRange(dateRange));
    } else if (pageNumber !== undefined) {
      params = params.append('query', query);
      params = params.append('pageNumber', pageNumber);
    } else {
      params = params.append('query', query);
    }

    return this.httpClient
      .get<Job[]>(this.baseUrl + '/search', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }
  private getDateRange(dateRangeSelected: string): string {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    if (DateRange.Week === +dateRangeSelected) {
      date.setDate(date.getDate() - 7);
      return date.toDateString();
    }

    if (DateRange.Month === +dateRangeSelected) {
      date.setDate(date.getDate() - 28);
      return date.toDateString();
    }

    if (DateRange.Year === +dateRangeSelected) {
      date.setDate(date.getDate() - 365);
      return date.toDateString();
    }
  }
}
