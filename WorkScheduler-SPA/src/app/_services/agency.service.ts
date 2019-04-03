import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agency } from '../_models/Agency';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  baseUrl = environment.apiUrl + 'agencies/';

  constructor(private httpClient: HttpClient) {}

  getAgencies() {
    return this.httpClient.get<Agency[]>(this.baseUrl);
  }
}
