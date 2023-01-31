import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultModel } from '../models/consult.model';
import { ConsultRequestModel } from '../models/consult-request.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultsService {

  constructor(
    private readonly http: HttpClient    
  ) {}

  getConsultsByPatient (id: string): Observable<ConsultModel[]> {
    return this.http.get<ConsultModel[]>(`${environment.api}/consults/findByPatient/${id}`);
  }

  createConsult (consult: ConsultRequestModel): Observable<ConsultModel> {
    return this.http.post<ConsultModel>(`${environment.api}/consults/create`, consult);
  }

  getConsult (id: string): Observable<ConsultModel> {
    return this.http.get<ConsultModel>(`${environment.api}/consults/${id}`);
  }

  updateConsult (id: string, consult: ConsultRequestModel): Observable<ConsultModel> {
    return this.http.patch<ConsultModel>(`${environment.api}/consults/update/${id}`, consult);
  }

  removeConsult (id: string): Observable<ConsultModel> {
    return this.http.delete<ConsultModel>(`${environment.api}/consults/remove/${id}`);
  }

}
