import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PatientModel } from '../../core/models/patient.model';
import { PatientRequestModel } from '../../core/models/patient-request.model';
import { PatientPipe } from '../pipes/patient.pipe';
import { environment } from 'src/environments/environment';
import { PaginationRequest } from '@core/interfaces/pagination-request.interface';
import { PaginationResponse } from '../../core/interfaces/pagination-response.interface';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private readonly http: HttpClient,
    private readonly patientPipe: PatientPipe,
    private readonly paginationService: PaginationService
  ) {}

  getPatients (): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(`${environment.api}/patients/findAll`).pipe(
      map((data) => {
        return data.map((patient) => {
          return this.patientPipe.transform(patient);
        })
      })
    );
  }

  getPatientsPagination (paginationReq: PaginationRequest): Observable<PaginationResponse> {
    return this.http.get<PaginationResponse>(`${environment.api}/patients/findPag?${this.paginationService.getUrlParameters(paginationReq)}`).pipe(
      map((data) => {
        let newData: PaginationResponse = Object.assign({}, data);
        newData.items.map((patient: PatientModel) => {
          return this.patientPipe.transform(patient);
        });
        return newData;
      })
    );
  }

  getPatient (id: string): Observable<PatientModel> {
    return this.http.get<PatientModel>(`${environment.api}/patients/findOne/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  createPatient (patient: PatientRequestModel): Observable<PatientModel> {
    return this.http.post<PatientModel>(`${environment.api}/patients/create`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  updatePatient (id: string, patient: PatientRequestModel): Observable<PatientModel> {
    return this.http.patch<PatientModel>(`${environment.api}/patients/update/${id}`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  removePatient (id: string): Observable<PatientModel> {
    return this.http.delete<PatientModel>(`${environment.api}/patients/remove/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }  

}
