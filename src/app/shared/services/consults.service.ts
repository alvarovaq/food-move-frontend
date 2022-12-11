import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultModel } from '../../core/models/consult.model';
import { ConsultRequestModel } from '../../core/models/consult-request.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultsService {

  constructor(
    private readonly http: HttpClient    
  ) {}

  getConsultsByPatient (): Observable<ConsultModel[]> {
    return this.http.get<ConsultModel[]>(`${environment.api}/consults/findByPatient`);
  }

  createConsult (consult: ConsultRequestModel): Observable<ConsultModel> {
    return this.http.post<ConsultModel>(`${environment.api}/consults/create`, consult);
  }
}
