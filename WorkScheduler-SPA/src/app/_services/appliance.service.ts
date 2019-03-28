import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplianceType } from '../_models/ApplianceType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {
  baseUrl = environment.apiUrl + 'appliances';

  constructor(private httpClient: HttpClient) { }

  getApplianceTypes() {
    return this.httpClient.get<ApplianceType[]>(this.baseUrl);
  }
}
