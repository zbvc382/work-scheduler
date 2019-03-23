import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../_models/Photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.apiUrl + 'jobs';
  constructor(private httpClient: HttpClient) { }

  getPhotos(jobId: number): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.baseUrl + '/' + jobId + '/photos');
  }
}
