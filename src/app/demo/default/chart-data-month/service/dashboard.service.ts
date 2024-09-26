import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMAIL_SERVICE_API } from 'src/app/theme/shared/constant/service-api.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  getCount():Observable<any>{
    return this.http.get<any>(environment.BASE_URL + EMAIL_SERVICE_API. GET_DRIVERCUSTOMERCOUNT)
}
}