import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultModel } from '../models/consult.model';

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
}
