import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../_models/Tag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  baseUrl = environment.apiUrl + 'tags/';

  constructor(private httpClient: HttpClient) {}

  getTags() {
    return this.httpClient.get<Tag[]>(this.baseUrl);
  }
}
