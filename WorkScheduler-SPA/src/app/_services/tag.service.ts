import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../_models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  baseUrl = 'http://localhost:5000/api/tags/';

  constructor(private httpClient: HttpClient) {}

  getTags() {
    return this.httpClient.get<Tag[]>(this.baseUrl);
  }
}
