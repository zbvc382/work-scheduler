import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agency } from '../_models/Agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  baseUrl = 'http://localhost:5000/api/agencies/';

  constructor(private httpClient: HttpClient) {}

  getAgencies() {
    return this.httpClient.get<Agency[]>(this.baseUrl);
  }
}
