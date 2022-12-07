import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_ENDPOINT } from '@shared/constants';
import { PatientModel } from '../models/patient.model';
import { PatientRequestModel } from '../models/patient-request.model';
import { PatientPipe } from '../pipes/patient.pipe';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private readonly http: HttpClient,
    private readonly patientPipe: PatientPipe    
  ) {}

  getPatients (): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(`${API_ENDPOINT}/patients/findAll`).pipe(
      map((data) => {
        return data.map((patient) => {
          return this.patientPipe.transform(patient);
        })
      })
    );
  }

  getPatient (id: string): Observable<PatientModel> {
    return this.http.get<PatientModel>(`${API_ENDPOINT}/patients/findOne/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  createPatient (patient: PatientRequestModel): Observable<PatientModel> {
    return this.http.post<PatientModel>(`${API_ENDPOINT}/patients/create`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  updatePatient (id: string, patient: PatientRequestModel): Observable<PatientModel> {
    return this.http.patch<PatientModel>(`${API_ENDPOINT}/patients/update/${id}`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  removePatient (id: string): Observable<PatientModel> {
    return this.http.delete<PatientModel>(`${API_ENDPOINT}/patients/remove/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }  

}
