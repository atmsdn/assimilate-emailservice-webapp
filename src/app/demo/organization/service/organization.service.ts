import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMAIL_SERVICE_API } from 'src/app/theme/shared/constant/service-api.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private http : HttpClient
  ) { }

  addOrg(payload: any) {
    return this.http.post(environment.BASE_URL + EMAIL_SERVICE_API.ADD_USER, payload)
  }
}
