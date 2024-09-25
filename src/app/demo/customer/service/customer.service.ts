import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BEEAH_API } from 'src/app/theme/shared/constant/service-api.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  getCustomerList(pageSize: number, pageNumber: any, searchTerm: string): Observable<any> {
    return this.http.get(environment.BASE_URL + BEEAH_API.GET_CUSTOMER + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&searchTerm=' + searchTerm)
  }

  addCustomer(payload: any) {
    return this.http.post(environment.BASE_URL + BEEAH_API.ADD_CUSTOMER, payload)
  }

  deleteCustomerSer(payload: any): Observable<any> {
    return this.http.put<any>(environment.BASE_URL + BEEAH_API.UPDATE_CUSTOMER + payload.id, payload )
  }

  updateCustomer(event: any, id: any) {
    return this.http.put(environment.BASE_URL + BEEAH_API.UPDATE_CUSTOMER + id, event)
  }

  getCustomerById(id: any): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + BEEAH_API.GET_CUSTOMERBYID + id)
  }
}






